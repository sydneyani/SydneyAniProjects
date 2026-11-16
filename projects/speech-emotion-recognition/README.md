# Speech emotion recognition

Classify acted emotions in the RAVDESS speech files. The notebooks credit the CNN to Sydney, the RNN to Ryan, and the Transformer to Edgar. Training code is unchanged.

## Problem

Map an utterance to one of eight emotions: neutral, calm, happy, sad, angry, fearful, disgust, surprised.

## Data

`kagglehub` downloads `uwrfkaggler/ravdess-emotional-speech-audio`. Each `.wav` is loaded at 22,050 Hz. The feature is the mean of 13 MFCCs. Both notebooks print **2,304 training samples and 576 test samples** (`test_size=0.2`, `random_state=42`). Labels are encoded with `LabelEncoder`.

## Method

- **CNN** (`cnn.ipynb` and the first section of `cnn-rnn-transformer.ipynb`): three Conv1d blocks (32, 64, 128 filters), max pooling, dropout 0.5, then linear layers.
- **LSTM** (`cnn-rnn-transformer.ipynb`): recurrent model trained for 50 epochs with class-weighted cross-entropy. The log reports validation loss and accuracy each epoch.
- **Transformer** (same notebook): linear projection to 128 dimensions, two encoder layers with four heads, global average pooling, then a classifier, trained for 10 epochs.

Sample reviews print the true label, the predicted label, and a confidence score for 10 test clips. Embedded audio players were removed from the saved outputs; the text logs and written findings are unchanged.

## Results

Saved logs and the notebooks' own write-ups disagree in a few places. Both are listed.

**Standalone CNN notebook.** The write-up says the model was correct on **2 of 10** reviewed clips (**20%**), and that incorrect predictions were often above 30% confidence.

**Comparison notebook, 10-clip reviews and closing summary.**

| Model | Stated accuracy on 10 clips | Training log |
| --- | --- | --- |
| CNN | 1 of 10 (10%). A later sentence in that same CNN section says 2 samples. | No epoch accuracy is printed. |
| LSTM | 7 of 10 (70%) in the review and in the closing summary. | Epoch 50/50: loss 0.6212, validation loss 0.9872, validation accuracy **66.49%**. Epoch 1 was 21.35%. |
| Transformer | 1 of 10 (10%). The write-up says confidence on correct predictions was mostly below 20%. | Epoch 10/10: loss 2.0234, validation accuracy **0.1806**. Epoch 1 was 0.1858. |

The closing summary still describes the Transformer as stronger on sequential dependencies than the LSTM. The printed accuracies do not show that: 10% and 0.1806 versus the LSTM's 70% on the clip review and 66.49% validation accuracy.

Notebooks: [cnn.ipynb](cnn.ipynb), [cnn-rnn-transformer.ipynb](cnn-rnn-transformer.ipynb).
