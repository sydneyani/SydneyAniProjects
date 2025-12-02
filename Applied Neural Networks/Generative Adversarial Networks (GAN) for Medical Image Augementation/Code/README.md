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
⚠️ Note: The folders in Colab ended up as
ham1000_images_part_1 and ham1000_images_part_2
(with four zeros), so the code uses those names.

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

## 5. Code Structure (Block-by-Block)
The notebook is organized into numbered sections / “code blocks”.
Below is what each one does.

### Block 0 – Imports & Global Config
Imports all required libraries (tensorflow, keras.layers, numpy, pandas, sklearn, etc.)

Prints TensorFlow version and GPU availability.

Sets global hyperparameters for:

Image size

Latent dimension

Learning rates

Number of epochs

Synthetic images per class

### Block 1 – Load & Preprocess HAM10000 (RGB)
Key steps:

Read metadata:

python
Copy code
meta = pd.read_csv(META_CSV)
Resolve file paths for each image_id:

python
Copy code
def resolve_path(img_id):
    fname = img_id + ".jpg"
    candidates = [
        os.path.join(IMG_DIR_1, fname),
        os.path.join(IMG_DIR_2, fname),
        os.path.join(IMG_DIR_1L, fname),
        os.path.join(IMG_DIR_2L, fname),
    ]
    for p in candidates:
        if os.path.exists(p):
            return p
    return None

meta["filepath"] = meta["image_id"].apply(resolve_path)
meta = meta.loc[meta["filepath"].notnull()].copy()
Encode labels (dx) as integers with LabelEncoder.

Load and resize images to 64×64 RGB, normalized to [0,1]:

python
Copy code
def load_and_preprocess_rgb(path, img_size=IMG_SIZE):
    img = load_img(path, target_size=(img_size, img_size))
    img = img_to_array(img) / 255.0
    return img
Train / validation / test split with stratification by label.

Output here:

X_train, X_val, X_test → (N, 64, 64, 3)

y_train, y_val, y_test → integer label arrays

num_classes and label_enc.classes_ for mapping back to labels

### Block 2 – Build Conditional DCGAN (cDCGAN)
Defines:

Conditional Generator (build_conditional_generator):

Inputs:

Noise vector z of shape (LATENT_DIM,)

Class label (integer in [0, num_classes-1])

Embeds label → concatenates embedding with noise

Dense → reshape to 8×8×256

Three Conv2DTranspose layers to upsample:

8×8 → 16×16

16×16 → 32×32

32×32 → 64×64 RGB

Output activation tanh (images in [-1,1])

Conditional Discriminator (build_conditional_discriminator):

Inputs:

Image (64,64,3)

Class label

Embeds label, reshapes to (64,64,1) and concatenates with image → (64,64,4)

Several Conv2D + LeakyReLU + BatchNorm blocks

Output: single sigmoid unit → probability “real vs fake” given class

Optimizers:

python
Copy code
opt_d = Adam(learning_rate=LR_GAN * 0.5, beta_1=0.5)  # D slower
opt_g = Adam(learning_rate=LR_GAN,       beta_1=0.5)  # G faster
Compile:

discriminator_c compiled standalone with opt_d.

gan_c (generator + frozen discriminator) compiled with opt_g.

### Block 3 – Train Conditional DCGAN (Stabilized)
Convert real train images to [-1,1]:

python
Copy code
X_train_gan = (X_train * 2.0) - 1.0
Build a tf.data Dataset pairing (image, label) and batching.

Training loop for EPOCHS_GAN:

Uses:

Label smoothing (real ≈ 0.9, fake ≈ 0.1)

Label noise

Instance noise (add Gaussian noise to inputs)

Two generator steps per discriminator step (helps G catch up)

At selected epochs (e.g. 1, 5, 10, …), calls:

python
Copy code
fig, gen_imgs = plot_generated_images_cgan(epoch)
This:

Displays a 4×4 grid of generated samples in Colab.

(Optionally) saves grids / individual images to:

cgan_progress/

cgan_samples/

### Block 4 – Generate Class-Conditional Synthetic Images
After the GAN is trained, we generate synthetic images per class:

python
Copy code
synth_imgs_list   = []
synth_labels_list = []

for c in range(num_classes):
    n_c         = N_SYNTH_PER_CLASS
    noise       = np.random.normal(0, 1, (n_c, LATENT_DIM))
    class_label = np.full((n_c, 1), c, dtype="int32")

    gen_c = generator_c.predict([noise, class_label], verbose=0)
    gen_c = (gen_c + 1) / 2.0  # scale back to [0,1]

    synth_imgs_list.append(gen_c)
    synth_labels_list.append(class_label.squeeze())
Then:

Concatenate all into synth_imgs and synth_labels

Visualize a grid of synthetic samples.

These are used for augmentation only, not as standalone test data.

### Block 5 – Build CNN Classifier
Defines a simple but effective CNN:

Three Conv2D + MaxPooling blocks

Flatten

Dense(128, ReLU) + Dropout(0.5)

Output Dense(num_classes, softmax)

Compiled with:

python
Copy code
optimizer = Adam(learning_rate=LR_CNN)
loss      = "sparse_categorical_crossentropy"
metrics   = ["accuracy"]

### Block 6 – Baseline CNN (Real Data Only)
Trains the classifier on only real training data:

python
Copy code
history_baseline = cnn_baseline.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=EPOCHS_CNN,
    batch_size=BATCH_SIZE,
    verbose=1
)

test_loss_base, test_acc_base = cnn_baseline.evaluate(X_test, y_test, verbose=0)
Also plots baseline training vs validation accuracy.

### Block 7 – CNN with GAN Augmentation
Augments the training data:

python
Copy code
X_train_aug = np.concatenate([X_train, synth_imgs], axis=0)
y_train_aug = np.concatenate([y_train, synth_labels], axis=0)
Then trains a new CNN (cnn_aug) on this augmented set:

python
Copy code
history_aug = cnn_aug.fit(
    X_train_aug, y_train_aug,
    validation_data=(X_val, y_val),
    epochs=EPOCHS_CNN,
    batch_size=BATCH_SIZE,
    verbose=1
)

test_loss_aug, test_acc_aug = cnn_aug.evaluate(X_test, y_test, verbose=0)

### Block 8 – Evaluation Metrics & Comparison
Prints and compares:

Baseline vs GAN-augmented test accuracy & loss

Plots validation accuracy curves:

python
Copy code
plt.plot(history_baseline.history['val_accuracy'], label='Baseline - Val Acc')
plt.plot(history_aug.history['val_accuracy'], label='GAN Augmented - Val Acc')
This gives a visual of whether GAN augmentation helped or slightly hurt performance.

### Block 9 – Confusion Matrix, Classification Report, Macro AUC
Predictions from cnn_aug:

python
Copy code
pred_probs = cnn_aug.predict(X_test, verbose=0)
preds      = np.argmax(pred_probs, axis=1)
Confusion matrices:

Raw counts

Normalized (per true class) to show recall per class

Classification report:

python
Copy code
print(classification_report(y_test, preds, target_names=label_enc.classes_))
Macro AUC (multi-class, one-vs-rest):

python
Copy code
from sklearn.metrics import roc_auc_score
auc_macro = roc_auc_score(y_test, pred_probs, multi_class="ovr")
print(f"Macro AUC (One-vs-Rest, GAN-Augmented Model): {auc_macro:.4f}")
Macro AUC reflects how well the model separates each lesion class from all others on average, treating each class equally.

## 6. How to Run the Whole Pipeline (Step-by-Step)
Open the notebook in Google Colab (or your local Jupyter with GPU).

Upload kaggle.json to /content.

Run the dataset download + unzip cell (if included in your notebook).

Run Block 0 → Block 1:

Confirms images + labels load correctly.

Run Block 2:

Builds conditional generator and discriminator.

Run Block 3:

Trains the cDCGAN.

You will see generated image grids every few epochs.

Run Block 4:

Generates class-conditional synthetic images.

Run Blocks 5–7:

Train baseline CNN and GAN-augmented CNN.

Run Blocks 8–9:

Print evaluation metrics

Plot curves

Show confusion matrices & macro AUC.

## 7. Outputs & Figures
Typical figures :

GAN Sample Grids:

epoch40, epoch50, epoch75, epoch85

Synthetic Samples:

Class-conditional grid (fake lesions conditioned on each dx class)

Validation Accuracy Curves:

Baseline vs GAN-augmented

Confusion Matrices:

Raw counts

Normalized recall

Metrics Summary:

Final test accuracy (baseline vs GAN)

Macro AUC

## 8. Interpretation 
The conditional GAN learns to generate skin-like textures and lesion-like blobs at 64×64.

GAN augmentation does not dramatically improve accuracy, but:

Maintains performance

Achieves strong macro AUC (≈0.91), suggesting good ranking behavior across classes.

This shows that synthetic medical images can be used to augment training, but careful validation is needed:

Not all GAN samples are clinically realistic.

Some classes remain challenging (e.g., melanoma vs benign pigmented lesions).

## 9. Citations


HAM10000 Dataset
Tschandl P, Rosendahl C, Kittler H. The HAM10000 dataset: A large collection of multi-source dermatoscopic images of common pigmented skin lesions. Scientific Data 5, 180161 (2018).