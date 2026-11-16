# Sydney Ani — Data Science Portfolio

Classification, tabular neural nets, and speech models in Python, plus SQL for healthcare and workforce data. The notebooks below keep their original training code. Numbers in the project notes are copied from saved notebook outputs.

**Stack:** pandas, NumPy, scikit-learn, XGBoost, PyTorch, SQL.

## Machine learning

| Project | Description | Techniques | Link |
| --- | --- | --- | --- |
| Census income classification | Predict whether income exceeds $50K on the UCI Adult / Census Income data (48,842 rows, 14 features). | pandas, scikit-learn, XGBoost, GridSearchCV | [census-income-classification](projects/census-income-classification/) |
| Car evaluation network | Classify UCI Car Evaluation acceptability with a scikit-learn MLP while varying learning rate, momentum, and hidden width. | NumPy, pandas, scikit-learn `MLPClassifier` | [car-evaluation](projects/car-evaluation/) |
| Speech emotion recognition | Classify eight RAVDESS emotions from MFCC features with a CNN, an LSTM, and a small Transformer. | PyTorch, librosa, scikit-learn | [speech-emotion-recognition](projects/speech-emotion-recognition/) |

## SQL and other work

| Project | Description | Techniques | Link |
| --- | --- | --- | --- |
| Hospital database | MySQL schema for patients, clinical staff, billing, and inventory, followed by twelve analytical questions. | SQL DDL, joins, aggregates | [sql/hospital-database.sql](sql/hospital-database.sql) |
| Workforce queries | Effective-dated department listing, a five-level manager hierarchy, and one row per person from assignment tables. | Oracle SQL, CTEs, `ROW_NUMBER` | [sql/advanced](sql/advanced/) |
| Speech-to-action bot | Flask app that waits for a wake word, transcribes a command, and maps it to a local action. | Python, Porcupine, SpeechRecognition | [AI/Speech To Action Bot](AI/Speech%20To%20Action%20Bot/) |
| Scriptora | Vue and Node app for profiles, friends, and events, built with classmates in CIS 4339. | Vue 3, Express, MongoDB | [Scriptora](Scriptora/) |
| Today's Vision | Full-stack app for a Manvel, TX business: sales tracking, catalog, and customer data. | React, Express, MongoDB | [Todays Vision](Full%20Stack%20Applications/Todays%20Vision/) |
| MEVN data platform | Vue and Express app for organizations, clients, services, and events. | Vue 3, Express, MongoDB | [MEVN Project](Full%20Stack%20Applications/MEVN%20Project/) |
| Email header checks | Python parsers that read a sample header and check sender domain, SPF, and DKIM fields. | Python `email` | [Email Header Analyzer](Email%20Header%20Analyzer/) |
| MongoDB notes | Shell exercises for databases, collections, and basic security setup. | MongoDB shell | [MongoDB](MongoDB/) |

## Layout

```
projects/census-income-classification/
projects/car-evaluation/
projects/speech-emotion-recognition/
sql/
```

Notebook dependencies are listed in [`requirements.txt`](requirements.txt). The car-evaluation folder has its own pinned file. Web apps keep the `package.json` already in each project.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Open a notebook from its project folder. Census Income is downloaded at runtime with `ucimlrepo`. RAVDESS is downloaded with `kagglehub`, which needs a Kaggle credential. Car Evaluation reads `projects/car-evaluation/data/car+evaluation/car.data`.

## License

[MIT](LICENSE) © Sydney Ani
