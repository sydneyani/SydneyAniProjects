# app.py

from flask import Flask, render_template
from threading import Thread
from scripts.recognize_speech import initialize_porcupine, start_audio_stream, listen_for_wake_word, audio_stream, porcupine

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def run_flask():
    app.run()

def run_listener():
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

if __name__ == "__main__":
    flask_thread = Thread(target=run_flask)
    listener_thread = Thread(target=run_listener)

    flask_thread.start()
    listener_thread.start()

    flask_thread.join()
    listener_thread.join()
