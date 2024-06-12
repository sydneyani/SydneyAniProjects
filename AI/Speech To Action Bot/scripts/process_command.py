import numpy as np
import tensorflow as tf

# Load trained model
model = tf.keras.models.load_model('models/action_model.h5')

def process_command(command):
    # Process command (this should be customized to your command structure)
    command_vector = np.array([command])  # Dummy processing
    prediction = model.predict(command_vector)
    return prediction

if __name__ == '__main__':
    command = "Your recognized command here"
    action = process_command(command)
    print(f"Predicted action: {action}")
