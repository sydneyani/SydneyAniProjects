# Project 3: Income Classification Using the UCI Census Dataset

This project focuses on predicting whether an individual's income exceeds $50K per year based on various demographic and employment-related features from the UCI Census Income dataset.

## Objective
To build, optimize, and evaluate multiple machine learning classification models to accurately predict income category (`>50K` or `<=50K`).

## Dataset
- Source: UCI Census Income Dataset
- Features: Includes age, workclass, education, marital status, occupation, race, sex, hours-per-week, and more
- Target: `income` (binary classification)

## Steps Performed

### Step 1: Dataset Overview
- Loaded dataset
- Defined features (`X`) and labels (`y`)
- Set up classification task

### Step 2: Data Cleaning and Preprocessing
- Removed missing/invalid entries
- Encoded categorical variables using `LabelEncoder`
- Scaled numerical features for normalization
- Conducted correlation analysis to reduce noise

### Step 3: Model Building
Trained and evaluated the following models:
- Logistic Regression
- K-Nearest Neighbors (KNN)
- Random Forest
- Support Vector Machine (SVM)

### Step 4: Hyperparameter Tuning and Feature Selection
- Used `GridSearchCV` to optimize parameters for all models
- Selected top features using correlation thresholds
- Evaluated models using:
  - Accuracy
  - F1 Score

## Results
- **Best Models**: Random Forest, SVM RBF, and Logistic Regression (based on F1 Score and Accuracy)
- Hyperparameter tuning and feature selection significantly boosted performance
- Visualized performance comparison in bar charts

## How to Run
1. Open `Project3.ipynb` in Jupyter Notebook or Google Colab.
2. Ensure required libraries are installed:
   ```bash
   pip install pandas numpy scikit-learn matplotlib seaborn
