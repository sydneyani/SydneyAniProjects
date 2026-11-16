# Car evaluation multilayer network

## Problem

Classify a car as `unacc`, `acc`, `good`, or `vgood` from categorical buying, maintenance, door, capacity, luggage, and safety ratings.

## Data

UCI Car Evaluation. The notebook loads `data/car+evaluation/car.data`. Label encoding printed in the notebook: 0 = `acc`, 1 = `good`, 2 = `unacc`, 3 = `vgood`. The generated report’s best-model classification table has 519 test rows (363 `unacc`, 115 `acc`, 21 `good`, 20 `vgood`).

## Method

One-hot encode the six categorical features and fit `MLPClassifier` (ReLU, SGD with momentum, batch size 64). The grid is learning rate `{0.01, 0.1, 0.8}`, momentum `{0.3, 0.9}`, and one hidden layer of width 4, 8, or 16 (18 runs). Each run records train and test accuracy, precision, recall, F1, and training MSE. Loss curves and `plots/results_summary.csv` are written under `plots/`.

```bash
pip install -r requirements.txt
```

Run the notebook from this directory so the relative `data/` and `plots/` paths resolve.

## Results

Sorted by test accuracy, the best row in `plots/results_summary.csv` is learning rate 0.1, momentum 0.9, hidden layer `(16,)`:

| Metric | Value |
| --- | --- |
| Train accuracy | 1.0 |
| Test accuracy | 0.9942 |
| Precision | 0.9942 |
| Recall | 0.9942 |
| F1 | 0.9942 |
| Train MSE | 6.24e-05 |

The notebook’s “best training MSE” printout is a different run: learning rate 0.8, momentum 0.9, hidden `(16,)`, train MSE 0.000002. That row’s test accuracy in the CSV is 0.9827.

Per-class metrics in `plots/Report.html` for the best model (519 test rows):

| Class | Precision | Recall | F1 | Support |
| --- | --- | --- | --- | --- |
| unacc | 0.995 | 0.997 | 0.996 | 363 |
| acc | 0.991 | 0.983 | 0.987 | 115 |
| good | 1.000 | 1.000 | 1.000 | 21 |
| vgood | 1.000 | 1.000 | 1.000 | 20 |

The report states accuracy 0.994, macro F1 0.996, and weighted F1 0.994. Several runs print a convergence warning at `max_iter` 200. The weakest test accuracy in the CSV is 0.7765 (learning rate 0.8, momentum 0.9, hidden `(8,)`).
