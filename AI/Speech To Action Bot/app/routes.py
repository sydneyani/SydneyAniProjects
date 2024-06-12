from flask import render_template
from app import app
from scripts.recognize_speech import recognize_speech
from scripts.process_command import process_command
from scripts.perform_action import perform_action

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run', methods=['POST'])
def run():
    command = recognize_speech()
    action = process_command(command)
    perform_action(action)
    return 'Action performed'
