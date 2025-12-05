import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.callbacks import Callback

# -------------------------
#   COMPLETION MESSAGE
# -------------------------
class DoneCallback(Callback):
    def on_train_end(self, logs=None):
        print("\n\n===============================")
        print("🔥 MODEL TRAINING COMPLETED 🔥")
        print("===============================\n")

# -------------------------
# AUTO CREATE MODEL FOLDER
# -------------------------
if not os.path.exists("model"):
    os.makedirs("model")

# -------------------------
# IMAGE LOADER
# -------------------------
data_dir = "photos"

img_gen = ImageDataGenerator(rescale=1.0/255, validation_split=0.2)

train = img_gen.flow_from_directory(
    data_dir,
    target_size=(150, 150),
    batch_size=8,
    class_mode="categorical",
    subset="training"
)

val = img_gen.flow_from_directory(
    data_dir,
    target_size=(150, 150),
    batch_size=8,
    class_mode="categorical",
    subset="validation"
)

# -------------------------
# SIMPLE MODEL
# -------------------------
model = Sequential([
    Flatten(input_shape=(150, 150, 3)),
    Dense(256, activation="relu"),
    Dense(128, activation="relu"),
    Dense(train.num_classes, activation="softmax")
])

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# -------------------------
# TRAIN
# -------------------------
model.fit(
    train,
    validation_data=val,
    epochs=10,
    callbacks=[DoneCallback()]
)

# -------------------------
# SAVE
# -------------------------
model.save("model/my_model.h5")

print("\n✔ Model saved at: model/my_model.h5")
print("✔ System Finished Successfully!")
