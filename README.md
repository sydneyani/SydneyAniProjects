# Sydney Ani — Data Science Portfolio

Classification, tabular neural nets, speech emotion models, and SQL. The notebooks use pandas, NumPy, scikit-learn, XGBoost, and PyTorch. Metrics below are copied from saved notebook outputs and from `car-evaluation-mlp/plots/results_summary.csv`.

## Projects

| Project | Description | Techniques | Link |
| --- | --- | --- | --- |
| Census income classification | Predict whether a person earns more than $50K a year from the UCI Adult / Census Income data. | pandas, scikit-learn, XGBoost, PyTorch, GridSearchCV | [notebook](census-income-classification/census-income-classification.ipynb) |
| Car evaluation network | Classify UCI Car Evaluation rows with a multilayer perceptron while varying learning rate, momentum, and hidden width. | pandas, NumPy, scikit-learn `MLPClassifier` | [notebook](car-evaluation-mlp/car-evaluation.ipynb) |
| Speech emotion CNN | Train a 1D CNN on RAVDESS MFCC features and spot-check predicted emotions. | librosa, PyTorch, scikit-learn | [notebook](speech-emotion-cnn/speech-emotion-cnn.ipynb) |
| Speech emotion architectures | Compare CNN, RNN, and Transformer models on the same RAVDESS split. | PyTorch, librosa, MFCCs | [notebook](speech-emotion-architectures/speech-emotion-cnn-rnn-transformer.ipynb) |
| Hospital database | MySQL schema, sample inserts, and analytical queries for a hospital data model. | SQL (MySQL) | [script](sql-hospital-database/hospital-schema.sql) |
| Workforce queries | Effective-dated department, assignment, and manager-hierarchy queries. | SQL (Oracle-style analytic functions) | [queries](sql-workforce-queries/) |

Each project folder has a short README with the problem, data, method, and the numbers that appear in that project.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

The car-evaluation notebook reads `car-evaluation-mlp/data/car+evaluation/car.data`, which is in the repo. The census notebook downloads UCI Census Income through `ucimlrepo`. Both speech notebooks download RAVDESS through `kagglehub` (a Kaggle API token is required) and are large because saved outputs include audio players.

## Also in this repo

These folders are coursework and application projects, not the modeling notebooks above.

| Project | What it is | Link |
| --- | --- | --- |
| Scriptora | Vue and Node data-platform app (CIS 4339) | [Scriptora](Scriptora/) |
| MEVN project | Vue, Express, and MongoDB app from the same course | [MEVN](Full%20Stack%20Applications/MEVN%20Project/) |
| Today's Vision | React, Express, and MongoDB app for a Manvel, TX business | [Today's Vision](Full%20Stack%20Applications/Todays%20Vision/) |
| Building management API | Express and Python API for floors, rooms, and residents | [javascript/Express](javascript/Express/) |
| Speech-to-action bot | Flask app that maps speech commands to actions | [AI/Speech To Action Bot](AI/Speech%20To%20Action%20Bot/) |
| Email header analyzer | Python checks for Google and Yahoo header samples | [Email Header Analyzer](Email%20Header%20Analyzer/) |
| Portfolio site | React page bootstrapped with Create React App | [Portfolio](Portfolio/) |

## License

MIT. See [LICENSE](LICENSE).
