# Assignment 1: Named Entity Recognition with SpaCy

This assignment focuses on evaluating the performance of SpaCy's Named Entity Recognition (NER) model against manually annotated data using a real-world tweet dataset.

## Objective
To compare SpaCy’s automatic NER tagging with a manually annotated dataset and evaluate its performance across key entity categories.

## Dataset
- **Manual_Annotated_Tweets.json**: Contains tweets with manually annotated named entities.
- **Entity Labels Evaluated**: 
  - `LOC`, `PERSON`, `NORP`, `ORG`, `GPE`, `DATE`, `MONEY`

## Tools Used
- [SpaCy](https://spacy.io/) for named entity recognition
- Scikit-learn for computing performance metrics

## Evaluation Metrics
- **Precision** – Measures correctness (how many selected items are relevant)
- **Recall** – Measures completeness (how many relevant items are selected)
- **F1 Score** – Harmonic mean of Precision and Recall, balances both for robust evaluation

## Results
- SpaCy’s performance was strongest when evaluated using the **F1 Score**, which best balanced precision and recall.
- Certain entity categories such as `DATE` showed large discrepancies between SpaCy and manual annotations.
- The **Confusion Matrix** provided insights on which entity types were consistently misclassified.

### Performance Summary
- **Precision & Recall** showed signs of overfitting or underfitting in some cases.
- **F1 Score** proved to be the most reliable metric for NER evaluation.

## How to Run
1. Open `Hw1_Assignment 1.ipynb` in Jupyter Notebook.
2. Load the dataset from `Manual_Annotated_Tweets.json`.
3. Run all cells to compare SpaCy's output with manual annotations and generate evaluation metrics and confusion matrix.

## Dependencies
- Python 3.7+
- `spacy`
- `scikit-learn`
- `matplotlib`
- `pandas`
- `json`

---

*Author: Sydney Ani*  
*Course: EDS 6397 – NLP*  
*Instructor: Ekhtari*  
*Date: February 2, 2025*
