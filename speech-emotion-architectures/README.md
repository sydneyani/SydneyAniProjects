# Speech emotion recognition (CNN, RNN, Transformer)

## Problem

Compare a 1D CNN, an RNN, and a Transformer on speech emotion classification using the same RAVDESS features.

## Data

RAVDESS via `kagglehub`. The data-prep cell prints 2,304 training samples and 576 test samples. The Transformer cell prints `X_train_reshaped` as `torch.Size([2304, 13, 1])` (13 MFCC coefficients). Audio is not stored in the repo; players are embedded in the notebook output.

## Method

The notebook defines `ImprovedCNNModel`, `ImprovedRNNModel`, and `TransformerClassifier` in PyTorch. The RNN training loop runs 50 epochs and logs training loss, validation loss, and validation accuracy. The Transformer loop runs 10 epochs and logs loss and validation accuracy. Each model is then spot-checked on 10 clips. A bar chart hardcodes accuracies of 10, 70, and 10 for CNN, RNN, and Transformer.

## Results

Two different scores are saved, and they are not the same quantity.

RNN validation accuracy during training starts at 21.35% (epoch 1), peaks at 66.84% (epoch 43, validation loss 1.0077), and ends at 66.49% (epoch 50, training loss 0.6212, validation loss 0.9872).

Transformer validation accuracy over 10 epochs stays between 0.1649 and 0.1962. The best printed value is 0.1962 on epoch 3. Epoch 10 prints loss 2.0234 and validation accuracy 0.1806. No full-test accuracy is printed for the CNN in this notebook.

The 10-clip spot-check, which the markdown and the bar chart use:

| Model | Spot-check called out in the notebook | What the 10 printed predictions show |
| --- | --- | --- |
| CNN | 1 of 10 (10%) | 1 match (angry). Most other clips are predicted angry, with confidence about 0.34 to 0.58. |
| RNN | 7 of 10 (70%) | 7 matches. Correct clips include disgust at 0.81 and 0.91, happy at 0.99, and angry at 1.00. |
| Transformer | 1 of 10 (10%) | 1 match (angry at confidence 0.21). Other confidences are about 0.15 to 0.23. |

The closing markdown treats the spot-check percentages as the model accuracies. The RNN training log is higher-resolution evidence and tops out at 66.84% validation accuracy, not 70%.
