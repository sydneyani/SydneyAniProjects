# Assignment 3: Financial Text Classification with Deep Learning

This assignment focuses on classifying financial texts using multiple deep learning models, analyzing performance across architectures, and visualizing training trends.

## Dataset
- A CSV dataset `assignment3_data.csv` containing financial documents and associated labels.
- Preprocessing includes:
  - Handling numerical and financial terms
  - Removing punctuation and special characters
  - Tokenization and padding

## Models Compared
Seven neural models were developed and compared:
1. FFN (Frozen Embedding)
2. FFN (Trainable Embedding)
3. RNN
4. Bi-directional RNN (Bi-RNN)
5. LSTM
6. Bi-directional LSTM (Bi-LSTM)
7. Custom architecture

## Visualizations
- **Training History**: Accuracy and loss curves for each model.
- **Comparison Chart**: Final validation accuracy and loss comparison across all models.

## Results
- LSTM and Bi-LSTM models achieved the highest accuracy and lowest loss.
- Validation loss diverged from training loss in some models, indicating overfitting in cases like Model 1 and Model 2.

## Instructions to Run
1. Run `Ani_HW3.ipynb` in Jupyter Notebook or Google Colab.
2. Ensure `assignment3_data.csv` is available in the working directory.
3. Execute all cells sequentially to preprocess data, train models, and visualize results.

## Dependencies
- Python 3.7+
- TensorFlow / Keras
- NLTK
- NumPy
- Matplotlib
- Pandas

---

*Author: Sydney Ani*
