import os
import pvporcupine
import pyaudio
import struct
import speech_recognition as sr
import subprocess
import simpleaudio as sa
import time
import pyautogui
from openai import OpenAI

# Initialize recognizer
recognizer = sr.Recognizer()

# Porcupine keyword detection setup
porcupine = None
audio_stream = None

# Set up OpenAI API key

client = OpenAI(api_key=openai_api_key)

# Function to recognize speech and return the text
def recognize_speech_from_mic():
    with sr.Microphone() as source:
        print("Please wait. Calibrating microphone...")
        recognizer.adjust_for_ambient_noise(source, duration=1)  # Adjusted duration to 1 second
        print("Microphone calibrated. Say something!")
        audio = recognizer.listen(source)
        
    try:
        print("Recognizing speech...")
        command = recognizer.recognize_google(audio)
        print(f"You said: {command}")
        return command
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand the audio")
        return None
    except sr.RequestError as e:
        print(f"Could not request results from Google Speech Recognition service; {e}")
        return None

# Function to generate a report using OpenAI's API
def generate_report(topic):
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"Write a detailed report about {topic}."}
    ]
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0
    )
    report = response.choices[0].message.content.strip()
    return report

# Function to map commands to actions
def execute_command(command):
    # Define command to action mappings
    commands = {
        "open browser": "start chrome",
        "open notepad": "notepad",
        "shutdown": "shutdown /s /t 1",
        "open microsoft word": r'"C:\Program Files\Microsoft Office\root\Office16\winword.exe"',  # Adjust the path as necessary
        "start notepad": "notepad"
    }

    report_phrases = [
        "generate a report about",
        "generate report on",
        "write me a paper about",
        "write a paper about",
        "write a paper on",
        "write a report about",
        "write me a report about",
        "write me a report on",
        "write an essay about",
        "write me an essay about",
        "write me an essay on"
    ]

    for phrase in report_phrases:
        if phrase in command.lower():
            topic = command.lower().replace(phrase, "").strip()
            action = commands.get("open microsoft word")
            if action:
                print(f"Executing command: {action}")
                subprocess.Popen(action, shell=True)  # Use Popen to run the command in a non-blocking manner
                time.sleep(1)  # Wait for Microsoft Word to open

                # Use keyboard shortcuts to navigate to "Blank Document"
                pyautogui.hotkey('ctrl', 'n')  # This is a common shortcut to open a new document in many versions of Word
                time.sleep(0.5)  # Wait a bit before pressing Enter
                pyautogui.press('enter')  # Press Enter
                pyautogui.press('enter')  # Press Enter again
                time.sleep(0.5)  # Wait for the blank document to open

                # Generate the report content
                report_content = generate_report(topic)

                # Type the report content
                pyautogui.typewrite(report_content)
                return True

    action = commands.get(command.lower())
    if action:
        print(f"Executing command: {action}")
        subprocess.Popen(action, shell=True)  # Use Popen to run the command in a non-blocking manner
        return True

    print("Command not recognized or not supported.")
    return False

def initialize_porcupine():
    global porcupine
    # Ensure the path is absolute and correct
    keyword_path = os.path.abspath("models/Sydney_en_windows_v3_0_0.ppn")

    if not os.path.exists(keyword_path):
        raise ValueError(f"Keyword file not found at path: {keyword_path}")

    porcupine = pvporcupine.create(
        access_key="CJx90F5RMY4vSI8VHpXhaLH39GjdUqyILc96+kGtZajzuGDGlLzd1w==",
        keyword_paths=[keyword_path]
    )

def start_audio_stream():
    global audio_stream
    pa = pyaudio.PyAudio()
    audio_stream = pa.open(
        rate=porcupine.sample_rate,
        channels=1,
        format=pyaudio.paInt16,
        input=True,
        frames_per_buffer=porcupine.frame_length
    )

def listen_for_wake_word():
    global audio_stream
    while True:
        pcm = audio_stream.read(porcupine.frame_length)
        pcm = struct.unpack_from("h" * porcupine.frame_length, pcm)

        keyword_index = porcupine.process(pcm)
        if keyword_index >= 0:
            print("Wake word detected. Playing feedback sound...")
            time.sleep(1)  # Add a 1-second delay before playing the sound
            wave_obj = sa.WaveObject.from_wave_file("sounds/hmm.wav")
            play_obj = wave_obj.play()
            play_obj.wait_done()  # Wait until sound has finished playing
            print("Listening for command...")
            command = recognize_speech_from_mic()
            if command:
                execute_command(command)
            print("Listening for wake word again...")

if __name__ == "__main__":
    try:
        initialize_porcupine()
        start_audio_stream()
        print("Listening for wake word...")
        listen_for_wake_word()
    except KeyboardInterrupt:
        print("Stopping...")
    finally:
        if audio_stream is not None:
            audio_stream.close()
        if porcupine is not None:
            porcupine.delete()
