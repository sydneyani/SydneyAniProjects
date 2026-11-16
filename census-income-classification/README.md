# Census income classification

## Problem

Predict whether annual income exceeds $50K using the UCI Census Income dataset (also called Adult). The notebook metadata describes a binary target (`>50K`, `<=50K`).

## Data

Fetched in the notebook with `ucimlrepo` id 20. The printed metadata reports 48,842 instances and 14 features, with missing values. Printed missing counts: `workclass` 963, `occupation` 966, `native-country` 274. Other columns print as 0 missing.

Selected features printed after cleaning: `education-num`, `relationship`, `hours-per-week`, `age`, `capital-gain`, `sex`, `marital-status`, `capital-loss`.

## Method

Label-encode categorical columns, scale numeric columns, then train logistic regression, k-nearest neighbors, random forest, and SVM. Later cells tune models with `GridSearchCV`, train XGBoost and an extreme learning machine, fit a small PyTorch network for 20 epochs, and build an ensemble. Evaluation uses accuracy and `classification_report` on a 9,525-row test set.

## Results

Saved reports score three labels (0, 1, and 2), even though the printed dataset metadata describes a binary income target. Support on that test set is 7,170 / 1,617 / 738.

Accuracies printed in the notebook:

| Model | Accuracy |
| --- | --- |
| Logistic regression | 0.7904 |
| KNN, before the later tuning cell | 0.7899 |
| Random forest, before tuning | 0.7831 |
| Tuned random forest | 0.8110 |
| Random forest on the selected features | 0.8110 |
| KNN after the tuning cell | 0.7903 |
| Random forest in the comparison cell | 0.8062 |
| SVM, RBF kernel | 0.8091 |
| XGBoost | 0.8184 |
| Extreme learning machine | 0.8044 |
| PyTorch network (20 epochs) | 0.75 (printed F1-score 0.65) |
| Ensemble | 0.8184 |

The XGBoost report prints weighted-average F1 0.78. The PyTorch report predicts only class 0. The ensemble report matches the XGBoost report. The linear-SVM cell starts training, and no accuracy for that model is stored in the output. No before-versus-after F1 table is printed; that comparison is a chart only.
