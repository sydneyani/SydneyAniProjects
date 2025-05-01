# NLP Assignment: Text Preprocessing, Document Similarity, and Word Embeddings

This assignment explores multiple natural language processing (NLP) techniques across four tasks using movie-related datasets. The overall goal is to clean and analyze text data, compute document similarity, and understand word relationships using vector representations.

## Tasks Overview

### Task 1: Preprocessing
- Load and inspect the dataset
- Clean missing data
- Preprocess text by:
  - Removing punctuation
  - Tokenizing
  - Removing stopwords
  - (Optionally) Lemmatizing

### Task 2: TF-IDF Vectorization and Similarity
- Transform preprocessed documents into TF-IDF vectors
- Define a similarity function (e.g., cosine similarity)
- Recommend similar movies based on text similarity

### Task 3: Word2Vec Embeddings
- Train a Word2Vec model on the corpus
- Represent documents using average word vectors
- Compute similarity using the trained embeddings
- Compare performance with:
  - A custom-trained Word2Vec model
  - A pretrained Google News Word2Vec model

### Task 4: Word Analogies and Visualization
- Compute word analogies using vector arithmetic
- Visualize high-dimensional word embeddings using t-SNE for intuitive understanding

## Requirements
- Python 3.7+
- Jupyter Notebook
- Libraries: `nltk`, `gensim`, `sklearn`, `matplotlib`, `pandas`, `numpy`, `scipy`, `seaborn`

## How to Run
1. Open both notebooks in Jupyter:
   - `Ani_HW2_Tasks1_2_3.ipynb`
   - `Ani_HW2_Task4.ipynb`
2. Run the cells sequentially.
3. Ensure required data files and models (e.g., pretrained Word2Vec) are accessible.

## Output
- Cleaned text data
- Document similarity rankings
- Embedding-based recommendations
- Word analogy results
- 2D visualizations of word vectors

---

*Author: Sydney Ani*
