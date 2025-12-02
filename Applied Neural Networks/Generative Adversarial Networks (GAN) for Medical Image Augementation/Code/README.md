# Most Recent Project 12/2/2025 :

# Generative Adversarial Networks for Medical Image Augmentation  
**Synthetic Skin Lesion Image Generation using HAM10000**

Author: **Sydney Ani, Nicolas Osorio, Lujia Wu**  
Course: **ELET 6303 – Applied Neural Networks**  
Instructor: **Dr. Malki**

---

## 1. Project Overview

This project trains a **conditional Deep Convolutional GAN (cDCGAN)** on the **HAM10000** dermatoscopic skin lesion dataset to generate **synthetic skin lesion images**.

Those synthetic images are then used to **augment the training set** of a **CNN classifier**, and we compare:

- A **baseline CNN** (trained only on real images)  
vs.  
- A **GAN-augmented CNN** (trained on real + synthetic images)

We report:

- Test accuracy (baseline vs GAN-augmented)  
- Validation accuracy curves  
- Confusion matrices  
- **Macro AUC (one-vs-rest)** across the 7 lesion classes  

Lesion classes:
`akiec, bcc, bkl, df, mel, nv, vasc`

---

## 2. Environment & Dependencies

The code was developed and tested primarily in **Google Colab** with GPU enabled.

### Core libraries

- Python 3.x  
- TensorFlow / Keras (2.x)
- NumPy
- Pandas
- Matplotlib
- Seaborn
- scikit-learn
- tqdm

In Colab, the notebook also runs:

```python
!pip install tensorflow_addons
Make sure Runtime → Change runtime type → GPU is selected in Colab.
```

## 3. Dataset: HAM10000 Setup
We use the HAM10000 dataset (Human Against Machine with 10000 training images) from Kaggle.

You will need:

A Kaggle account

A kaggle.json API token

### 3.1. Add kaggle.json in Colab
Go to Kaggle → Account → Create API Token.

Download kaggle.json.

In Colab, upload kaggle.json to /content (or your project root).

Example Colab setup (you can adapt as needed):

python
Copy code
import os, zipfile, json

### Make sure kaggle.json is in /content
assert os.path.exists("/content/kaggle.json"), "Upload kaggle.json to /content first."

os.environ["KAGGLE_CONFIG_DIR"] = "/content"
!mkdir -p ~/.kaggle
!cp /content/kaggle.json ~/.kaggle/
!chmod 600 ~/.kaggle/kaggle.json

### Download HAM10000 from Kaggle
!kaggle datasets download -d kmader/skin-cancer-mnist-ham10000 -p /content

### Unzip
!unzip -q /content/skin-cancer-mnist-ham10000.zip -d /content/ham10000_raw
After extraction, the final working layout in this project is something like:

text
Copy code
/content/
  ham1000_images_part_1/
  ham1000_images_part_2/
  ham10000_metadata.csv
  kaggle.json


## 4. Paths & Configuration
Early in the notebook / script, we set:

python
Copy code
META_CSV   = "/content/ham10000_metadata.csv"

IMG_DIR_1  = "/content/ham1000_images_part_1"
IMG_DIR_2  = "/content/ham1000_images_part_2"
IMG_DIR_1L = "/content/ham1000_images_part_1"
IMG_DIR_2L = "/content/ham1000_images_part_2"

IMG_SIZE   = 64         # images resized to 64x64
CHANNELS   = 3          # RGB
LATENT_DIM = 100        # noise vector size for GAN
BATCH_SIZE = 64
EPOCHS_GAN = 90         # actual GAN training run
EPOCHS_CNN = 15         # classifier training
LR_GAN     = 0.0002
LR_CNN     = 0.0003
N_SYNTH_PER_CLASS = 800
You can tweak these hyperparameters as needed.



## 5. Outputs & Figures
Typical figures :

GAN Sample Grids:

epoch40 :

<img width="589" height="593" alt="image" src="https://github.com/user-attachments/assets/27825549-aa19-4af7-9e63-61db9093f972" />

epoch50 :

<img width="589" height="593" alt="image" src="https://github.com/user-attachments/assets/4f082968-24ba-4640-9242-6859fd46d306" />

epoch75 :

<img width="589" height="593" alt="image" src="https://github.com/user-attachments/assets/4d405f46-37d1-4875-ac26-6ba7bcb99a6a" />

epoch85 :

<img width="589" height="593" alt="image" src="https://github.com/user-attachments/assets/1e72e648-e4e5-4c17-812b-d539e4586f53" />


Synthetic Samples:

Class-conditional grid (fake lesions conditioned on each dx class)

<img width="581" height="592" alt="image" src="https://github.com/user-attachments/assets/8a930722-759d-49a7-937c-42fa145989f0" />


Validation Accuracy Curves:

Baseline vs GAN-augmented

<img width="576" height="455" alt="image" src="https://github.com/user-attachments/assets/0f681b25-5bb8-41ae-9aef-e8fcede28dcc" />

Confusion Matrices:

Raw counts :

<img width="882" height="790" alt="image" src="https://github.com/user-attachments/assets/7c0febe4-231b-46d8-b461-fa7f169a61ff" />


Normalized recall :

<img width="878" height="790" alt="image" src="https://github.com/user-attachments/assets/89413baf-aa23-41f7-8a00-926696bc755f" />


Metrics Summary:

<img width="404" height="150" alt="evalmetrics" src="https://github.com/user-attachments/assets/812e8e3c-17d2-4c3d-a0aa-f2b597acbc93" />


Macro AUC :

<img width="244" height="26" alt="macroauc" src="https://github.com/user-attachments/assets/f3441293-403a-450e-bbe9-9b77bc317784" />


## 6. Interpretation 
The conditional GAN learns to generate skin-like textures and lesion-like blobs at 64×64.

GAN augmentation does not dramatically improve accuracy, but:

Maintains performance

Achieves strong macro AUC (≈0.91), suggesting good ranking behavior across classes.

This shows that synthetic medical images can be used to augment training, but careful validation is needed:

Not all GAN samples are clinically realistic.

Some classes remain challenging (e.g., melanoma vs benign pigmented lesions).

## 7. Citations


HAM10000 Dataset
Tschandl P, Rosendahl C, Kittler H. The HAM10000 dataset: A large collection of multi-source dermatoscopic images of common pigmented skin lesions. Scientific Data 5, 180161 (2018).
