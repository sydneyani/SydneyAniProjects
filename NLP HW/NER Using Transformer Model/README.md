# Assignment 4: Named Entity Recognition (NER) with Transformers and Ensemble Learning

This assignment focuses on building a Named Entity Recognition (NER) pipeline using Hugging Face Transformers, evaluating its performance, and comparing results using majority voting.

## Dataset
- Source: `assignment4_data.json`
- Pre-annotated with named entities like `ORG`, `DATE`, `GPE`, `NORP`, `PERSON`, and `MONEY`.

## Steps Performed
1. **Tag Distribution Visualization**  
   Plotted tag frequencies for entity types using the IOB tagging scheme.

2. **Preprocessing**  
   - Converted entity spans to IOB format.
   - Built a custom `NERDataset` class using the `datasets` and `transformers` libraries.

3. **Modeling with Transformers**  
   - Used a pre-trained BERT model for token classification.
   - Fine-tuned the model on the NER dataset.

4. **Evaluation**  
   - Generated heatmap-based classification reports for:
     - First-tag prediction (`classification_report_first_tag.png`)
     - Ensemble Majority Voting (`classification_report_majority.png`)
   - Metrics reported include precision, recall, and F1-score.

## Results Summary
- High precision and recall were achieved for the majority class (`O`), but entity-specific classes like `B-LOC` and `B-ORG` showed lower recall.
- The ensemble model improved coverage for several tags but struggled with continuation tags (e.g., `I-LOC`, `I-PER`) which scored 0 in some cases.

## How to Run
1. Ensure dependencies are installed:
   ```bash
   pip install torch transformers datasets scikit-learn matplotlib pandas
