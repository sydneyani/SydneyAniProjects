import os

def perform_action(action):
    if action == 1:
        os.system("start notepad.exe")  # Example action
    elif action == 2:
        os.system("start calc.exe")     # Example action
    else:
        print("Unknown action")

if __name__ == '__main__':
    action = 1  # Example action
    perform_action(action)
