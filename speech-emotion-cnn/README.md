# Speech emotion recognition (CNN)

## Problem

Classify the emotion in a short speech clip. Emotions in the saved spot-check include disgust, fearful, sad, surprised, angry, happy, and calm.

## Data

RAVDESS emotional speech, downloaded in the notebook with `kagglehub` (`uwrfkaggler/ravdess-emotional-speech-audio`). The saved output reports 2,304 training samples and 576 test samples. Features are MFCCs extracted with librosa. The audio files are not stored in this repo.

## Method

`ImprovedCNNModel` is a PyTorch 1D CNN (Conv1d layers starting at 32 channels). The evaluation cell runs the model on the first 10 test clips, prints the true label, the predicted label, and a confidence, and embeds an audio player for each clip.

## Results

The notebook does not print an accuracy over the full 576-row test set. The saved 10-clip spot-check, which the closing markdown summarizes as 2 of 10 (20%), is:

| Sample | True | Predicted | Confidence |
| --- | --- | --- | --- |
| 1 | disgust | disgust | 0.35 |
| 2 | fearful | surprised | 0.38 |
| 3 | fearful | surprised | 0.37 |
| 4 | sad | disgust | 0.38 |
| 5 | surprised | disgust | 0.35 |
| 6 | angry | surprised | 0.33 |
| 7 | happy | disgust | 0.35 |
| 8 | calm | disgust | 0.47 |
| 9 | surprised | surprised | 0.36 |
| 10 | happy | surprised | 0.38 |

Matches are samples 1 and 9. Confidences on the incorrect clips are about 0.33 to 0.47. The notebook’s own write-up says the model is overconfident and biased toward a small set of labels.
