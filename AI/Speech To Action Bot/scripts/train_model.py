import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense



# Create a dictionary with data
data = {
    'feature1': [1.2, 2.3, 3.1, 2.8],
    'feature2': [3.4, 4.5, 4.2, 3.7],
    'feature3': [5.6, 6.7, 5.9, 6.1],
    'action': [0, 1, 0, 1]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Save the DataFrame to a CSV file
df.to_csv('../data/training_data.csv', index=False)

# Load and preprocess data
try:
    # Adjust the path if necessary
    data = pd.read_csv('../data/training_data.csv')
    print("CSV file loaded successfully.")
    print("Data columns:", data.columns)
    print(data.head())  # Print the first few rows of the dataframe
except pd.errors.EmptyDataError:
    print("CSV file is empty.")
except FileNotFoundError:
    print("CSV file not found.")
except Exception as e:
    print(f"An error occurred: {e}")

# Ensure data is loaded and 'action' column exists
if data is not None:
    if 'action' in data.columns:
        X = data.drop('action', axis=1)
        y = data['action']
        print("Features and labels prepared.")
    else:
        print("The 'action' column is missing from the CSV file.")
        exit()
else:
    print("Data not loaded correctly.")
    exit()

# Define model
model = Sequential([
    Dense(64, activation='relu', input_shape=(X.shape[1],)),
    Dense(64, activation='relu'),
    Dense(1, activation='sigmoid')
])

# Compile model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train model
model.fit(X, y, epochs=10, batch_size=32)

# Save model
model.save('../models/action_model.h5')
