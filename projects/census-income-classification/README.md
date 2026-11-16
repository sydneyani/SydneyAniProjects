# Census income classification

Predict whether a person earns more than $50,000 a year. The notebook loads UCI Census Income (Adult, id 20) through `ucimlrepo`.

## Problem

Binary income classification on census attributes: age, work class, education, occupation, hours, capital gain and loss, and demographics. The saved metadata lists 48,842 instances and 14 features, with missing values.

## Data

The cleaning cell prints missing counts of 963 (`workclass`), 966 (`occupation`), and 274 (`native-country`). Those rows are dropped. Categorical columns are label-encoded, numeric columns are standardized, and features with absolute correlation above 0.1 versus `income` are kept:

`education-num`, `relationship`, `hours-per-week`, `age`, `capital-gain`, `sex`, `marital-status`, `capital-loss`.

The later classification reports are scored on 9,525 test rows (`test_size=0.2`). They print three labels, 0, 1, and 2, with support 7,170 / 1,617 / 738. Label 2 has precision 0.00 in the logistic regression report.

## Method

Untuned logistic regression, k-nearest neighbors, random forest, and SVM (linear and RBF). Random forest is then tuned with `GridSearchCV` (`n_estimators`, `max_depth`, `min_samples_split`, 5-fold, weighted F1). Later cells add XGBoost, an extreme learning machine, a small PyTorch network (20 epochs), and an ensemble. Model code is unchanged.

## Results

Figures below are the accuracy lines saved in the notebook. Weighted-average F1 is included where the classification report prints it.

| Model | Accuracy | Weighted F1 |
| --- | --- | --- |
| Logistic regression | 0.7904 | 0.74 |
| KNN (k=5) | 0.7899 | 0.76 |
| Random forest (100 trees) | 0.7831 | 0.76 |
| Tuned random forest | 0.8110 | 0.78 |
| Tuned KNN | 0.7903 | 0.76 |
| Random forest in the later comparison cell | 0.8062 | 0.77 |
| SVM, RBF kernel | 0.8091 | 0.77 |
| XGBoost | 0.8184 | 0.78 |
| Extreme learning machine | 0.8044 | 0.76 |
| PyTorch network | 0.75 | 0.65 |
| Ensemble | 0.8184 | 0.78 |

The linear SVM cell starts training and does not save an accuracy line. The notebook conclusion names XGBoost as the highest accuracy, 0.82, with F1 0.78, matching the XGBoost and ensemble rows above (printed accuracy 0.8183727034120735).

Feature importance after tuning keeps the same eight columns. The PyTorch run prints training loss 1.0499, 1.0208, 0.9922, and 0.9631 at epochs 5, 10, 15, and 20.

Notebook: [census-income-classification.ipynb](census-income-classification.ipynb).
