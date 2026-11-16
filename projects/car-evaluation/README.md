# Car evaluation network

Multilayer perceptron on the UCI Car Evaluation data. The notebook follows a local version of an AWS Academy-style tabular lab: prepare the table, train with SGD and momentum, and compare learning rate, momentum, and hidden width.

## Problem

Predict car acceptability (`unacc`, `acc`, `good`, `vgood`) from six categorical attributes: buying price, maintenance price, doors, person capacity, luggage boot, and safety.

## Data

The notebook loads `data/car+evaluation/car.data` and prints the first rows with columns `buying`, `maint`, `doors`, `persons`, `lug_boot`, `safety`, and `label`. That file has 1,728 rows. The printed label encoding is `0 → acc`, `1 → good`, `2 → unacc`, `3 → vgood`. Features are one-hot encoded. The class model is `MLPClassifier` with ReLU and SGD plus momentum.

## Method

A grid trains one hidden layer at widths `(4,)`, `(8,)`, and `(16,)`, learning rates `0.01`, `0.1`, and `0.8`, and momentum `0.3` and `0.9`. Each run records train and test accuracy, precision, recall, F1, and training MSE, and writes a loss curve under `plots/`. The summary table is `plots/results_summary.csv`.

## Results

Sorted by test accuracy, the saved table lists this configuration first:

| Learning rate | Momentum | Hidden | Train accuracy | Test accuracy | Precision | Recall | F1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0.10 | 0.9 | (16,) | 1.000000 | 0.994220 | 0.994213 | 0.994220 | 0.994211 |

The next two rows are learning rate 0.80, momentum 0.3, hidden `(8,)` and `(16,)`, both with test accuracy 0.990366.

The lowest training MSE printed in the notebook is a different run: learning rate 0.8, momentum 0.9, hidden `(16,)`, training MSE 0.000002. In `results_summary.csv` that row is `1.8386076820046635e-06`, with test accuracy 0.982659, below the best accuracy configuration.

The export cell records Python 3.10.9, NumPy 1.26.4, pandas 2.2.2, and scikit-learn 1.4.2.

Notebook: [car-evaluation.ipynb](car-evaluation.ipynb).
