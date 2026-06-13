import os
import sys
from pathlib import Path

# Support console outputs with emojis on Windows terminals
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# Paths
ML_DIR = Path(__file__).parent
WEIGHTS_PATH = Path("c:/Users/PAAL-DABBA/Desktop/backup-pdd/VanaVaidhya_model-20260422T071405Z-3-001/VanaVaidhya_model/best_v2.weights.h5")
TFLITE_OUT_PATH = ML_DIR / "output" / "best_v2_standard.tflite"

IMG_SIZE = 300
NUM_CLASSES = 71

print("Re-creating EfficientNetV2S model architecture...")
try:
    import tensorflow as tf
    from tensorflow.keras.applications import EfficientNetV2S
    from tensorflow.keras import layers, Model

    # Rebuild architecture
    base = EfficientNetV2S(
        input_shape=(IMG_SIZE, IMG_SIZE, 3),
        include_top=False,
        weights=None,
        pooling="avg",
    )

    inp = tf.keras.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    x = base(inp)
    x = layers.Dense(512, activation="relu")(x)
    x = layers.BatchNormalization()(x)
    x = layers.Dropout(0.3)(x)
    x = layers.Dense(256, activation="relu")(x)
    x = layers.BatchNormalization()(x)
    x = layers.Dropout(0.3)(x)
    out = layers.Dense(NUM_CLASSES, activation="softmax", dtype="float32")(x)

    model = Model(inp, out)

    print(f"Loading weights from {WEIGHTS_PATH}...")
    if not WEIGHTS_PATH.exists():
        print(f"Weights file not found at {WEIGHTS_PATH}!")
        sys.exit(1)
        
    model.load_weights(str(WEIGHTS_PATH))
    model.trainable = False

    print("Initializing TFLite Converter (restricting to standard built-in ops)...")
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    
    # Restrict to standard built-in TFLite operations (no Flex ops)
    converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS]
    
    # Enable basic optimizations
    converter.optimizations = [tf.lite.Optimize.DEFAULT]

    print("Converting model...")
    tflite_model = converter.convert()
    
    # Save the model
    os.makedirs(TFLITE_OUT_PATH.parent, exist_ok=True)
    with open(TFLITE_OUT_PATH, "wb") as f:
        f.write(tflite_model)
        
    size_mb = TFLITE_OUT_PATH.stat().st_size / 1024 / 1024
    print(f"Successful conversion! Standard TFLite model saved at:")
    print(f"   {TFLITE_OUT_PATH} ({size_mb:.2f} MB)")
    print("Ready for on-device deployment without Flex ops.")

except Exception as e:
    print(f"Conversion failed: {e}")
    sys.exit(1)
