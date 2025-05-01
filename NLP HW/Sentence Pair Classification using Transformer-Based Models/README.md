# Assignment 5: Sentence-Level Classification with Transformers

This assignment evaluates the effectiveness of pre-trained transformer models (RoBERTa) on two NLP tasks: paraphrase detection and entailment recognition. Both frozen and fully trainable models are compared to analyze performance trade-offs.

## Tasks Overview

### Task 1: Paraphrase Detection (MRPC)
- Dataset: Microsoft Research Paraphrase Corpus (MRPC)
- **Frozen RoBERTa**:
  - Trainable params: 592K
  - Best validation accuracy: ~57%
  - Early stopping after epoch 6 (best at epoch 3)
- **Unfrozen RoBERTa**:
  - Trainable params: ~125M
  - Trained for 4 epochs
  - Accuracy improvement: ~5-6%
- **Insight**: Fine-tuning all layers leads to improved performance for paraphrase classification.

### Task 2: Entailment Recognition (RTE)
- Dataset: Recognizing Textual Entailment (RTE)
- **Frozen RoBERTa**:
  - Validation accuracy: ~65%
  - Model exhibited high variance across epochs
- **Unfrozen RoBERTa**:
  - Trainable params: ~125M
  - Accuracy improvement: ~6-7%
  - Trained for 4 epochs with learning rate = 8e-6
- **Insight**: Fine-tuning helps more on complex tasks like entailment, especially with limited data.

## General Notes
- All experiments use RoBERTa from Hugging Face Transformers.
- Fine-tuning improves performance but increases computational cost.
- Early stopping and validation monitoring were used for stable training.

## How to Run
1. Open the following notebooks:
   - `Ani_Task1_HW5.ipynb`
   - `Ani_Task2_HW5.ipynb`
   - `Assignment5_SydneyAni.ipynb` (summary notebook)
2. Run in order or inspect individually in Jupyter Notebook.

## Dependencies
- Python 3.7+
- PyTorch
- Transformers (Hugging Face)
- Datasets
- Scikit-learn
- Pandas
- Matplotlib

---

*Author: Sydney Ani*
