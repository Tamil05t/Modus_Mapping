from transformers import T5Tokenizer, T5ForConditionalGeneration, Trainer, TrainingArguments
import torch
import onnxruntime as ort
import numpy as np
import os

# --- Load and Fine-Tune T5 Model ---
def fine_tune_t5():
    print("🔧 Fine-tuning T5 model...")

    # Load T5 model and tokenizer
    tokenizer = T5Tokenizer.from_pretrained("t5-small")
    model = T5ForConditionalGeneration.from_pretrained("t5-small")

    # Dummy crime data for fine-tuning
    train_data = [
        {"input_text": "A burglary occurred at 123 Main St. The suspect fled with cash and jewelry.", "target_text": "Burglary at 123 Main St."},
        {"input_text": "A theft was reported at the mall. The suspect stole a wallet.", "target_text": "Theft at the mall."},
    ]

    # Tokenize data
    train_encodings = tokenizer(
        [item["input_text"] for item in train_data], truncation=True, padding=True, return_tensors="pt"
    )
    train_labels = tokenizer(
        [item["target_text"] for item in train_data], truncation=True, padding=True, return_tensors="pt"
    )

    # PyTorch dataset class
    class CrimeDataset(torch.utils.data.Dataset):
        def __init__(self, encodings, labels):
            self.encodings = encodings
            self.labels = labels

        def __getitem__(self, idx):
            return {
                "input_ids": self.encodings["input_ids"][idx],
                "attention_mask": self.encodings["attention_mask"][idx],
                "labels": self.labels["input_ids"][idx],
            }

        def __len__(self):
            return len(self.encodings["input_ids"])

    # Prepare dataset
    train_dataset = CrimeDataset(train_encodings, train_labels)

    # Training arguments
    training_args = TrainingArguments(
        output_dir="./results",
        num_train_epochs=3,
        per_device_train_batch_size=2,
        save_steps=10_000,
        save_total_limit=2,
        logging_dir="./logs",
        logging_steps=10,
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
    )

    # Train the model
    trainer.train()

    # Save the fine-tuned model
    model_dir = "./fine-tuned-summarization-model"
    model.save_pretrained(model_dir)
    tokenizer.save_pretrained(model_dir)
    print("✅ Fine-tuning complete. Model saved at:", model_dir)

    # Convert to ONNX
    export_to_onnx(model, tokenizer, model_dir)

# --- Export Model to ONNX ---
def export_to_onnx(model, tokenizer, model_dir):
    print("🚀 Exporting model to ONNX format...")

    # Dummy input for ONNX conversion
    dummy_input = tokenizer("Sample crime description", return_tensors="pt")
    
    # Export to ONNX
    onnx_model_path = os.path.join(model_dir, "summarization_model.onnx")
    
    torch.onnx.export(
        model,                           # PyTorch model
        (dummy_input["input_ids"], dummy_input["attention_mask"]),  # Model inputs
        onnx_model_path,                  # Export path
        export_params=True,
        opset_version=11,
        input_names=["input_ids", "attention_mask"],
        output_names=["output"],
        dynamic_axes={"input_ids": {0: "batch_size"}, "attention_mask": {0: "batch_size"}}
    )

    print(f"✅ ONNX model saved at: {onnx_model_path}")

# --- Inference with ONNX Runtime ---
def summarize_crime_onnx(text):
    print("🔍 Running ONNX Inference...")
    
    model_dir = "./fine-tuned-summarization-model"
    onnx_model_path = os.path.join(model_dir, "summarization_model.onnx")
    
    # Load tokenizer and ONNX model
    tokenizer = T5Tokenizer.from_pretrained(model_dir)
    session = ort.InferenceSession(onnx_model_path)

    # Tokenize input
    inputs = tokenizer(text, return_tensors="np", truncation=True, padding=True)
    input_ids = inputs["input_ids"].astype(np.int64)
    attention_mask = inputs["attention_mask"].astype(np.int64)

    # Run inference
    outputs = session.run(None, {
        "input_ids": input_ids,
        "attention_mask": attention_mask
    })

    # Decode the output
    summary = tokenizer.decode(outputs[0][0], skip_special_tokens=True)
    return summary


# --- Main Execution ---
if __name__ == "__main__":
    # Fine-tune and export the model only if ONNX model doesn't exist
    model_path = "./fine-tuned-summarization-model/summarization_model.onnx"
    
    if not os.path.exists(model_path):
        fine_tune_t5()
    
    # Example Inference
    crime_text = "A robbery took place at a local bank. The suspect fled with cash."
    summary = summarize_crime_onnx(crime_text)
    
    print("\n🔹 Crime Summary:", summary)
