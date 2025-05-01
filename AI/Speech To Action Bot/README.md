# Speech To Action Bot

A voice-controlled assistant that performs actions based on spoken commands. This project uses wake word detection to start listening for commands and can perform various actions like opening applications and generating reports.

## Features

- **Wake Word Detection**: Listens for the wake word "Sydney" using Porcupine
- **Speech Recognition**: Converts spoken commands to text using Google's Speech Recognition API
- **Command Processing**: Uses a TensorFlow model to process and categorize commands
- **Action Execution**: Performs various system actions based on recognized commands
- **Report Generation**: Can generate reports on specified topics using OpenAI's API

## Project Structure
Speech-To-Action-Bot/
├── app.py              # Main application file
├── run.py              # Flask application runner
├── requirements.txt    # Project dependencies
├── test_app.py         # Unit tests
├── scripts/            # Core functionality scripts
│   ├── perform_action.py     # Execute actions
│   ├── process_command.py    # Process recognized commands
│   ├── recognize_speech.py   # Wake word detection and speech recognition
│   └── train_model.py        # Train the TensorFlow model
├── models/             # Machine learning models
│   ├── Sydney_en_windows_v3_0_0.ppn   # Porcupine wake word model
│   └── action_model.h5               # Trained TensorFlow model
├── sounds/             # Audio feedback files
│   ├── hmm.mp3         # Acknowledgment sound
│   └── hmm.wav         # Acknowledgment sound (WAV format)
└── data/               # Training data
└── training_data.csv    # Sample training data for the model

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/Speech-To-Action-Bot.git
cd Speech-To-Action-Bot
```

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```
Make sure you have the necessary API keys:

Set up your Porcupine access key in recognize_speech.py
Set up your OpenAI API key for report generation



## Usage

1. Run the application:

```bash
python app.py
```
2. The application will start listening for the wake word "Sydney"
3. When the wake word is detected, you'll hear an acknowledgment sound
4. Speak your command clearly after the sound
5. The bot will process your command and perform the corresponding action

## Supported Commands

- "Open browser" - Opens Chrome
- "Open notepad" - Opens Notepad
- "Shutdown" - Shuts down the computer
- "Open Microsoft Word" - Opens Microsoft Word
- Various phrases like "Generate a report about [topic]" - Opens Word and creates a report using OpenAI

## How It Works

1. Wake Word Detection: The system constantly listens for the wake word "Sydney" using Porcupine's wake word detection system.
2. Command Recognition: Once the wake word is detected, the system uses Google's Speech Recognition API to convert your spoken command to text.
3. Command Processing: The recognized text is processed and mapped to a predefined action or sent to the TensorFlow model for classification.
4. Action Execution: Based on the processed command, the system executes the corresponding action, such as opening an application or generating a report.
5. Report Generation: For report generation commands, the system uses OpenAI's API to generate comprehensive reports on the requested topic.

## Development
### Training the Model
To train the action recognition model with your own data:

1. Prepare your training data in a CSV file with features and action labels
2. Update the file path in train_model.py
3. Run the training script:

```bash
python scripts/train_model.py
```

## Adding New Commands
To add new commands:

1. Update the commands dictionary in recognize_speech.py
2. Define the corresponding action in perform_action.py


## Contributors

Sydney Ani

## Acknowledgments

Porcupine for wake word detection
Google Speech Recognition API
OpenAI for GPT integration
