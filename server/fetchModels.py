from transformers import AutoModelForSequenceClassification, AutoTokenizer
import os


def fetchModel(name, path):
    if os.path.isfile(f"{path}/pytorch_model.bin"):
        print(f"Model '{name}' already saved!")
    else:
        print(f"Fetching model: '{name}'")
        model = AutoModelForSequenceClassification.from_pretrained(name)
        print(f"Saving model to path: {path}")
        model.save_pretrained(path)
        print("Saved!")
    if os.path.isfile(f"{path}/tokenizer.json"):
        print(f"Tokenizer '{name}' already saved!")
    else:
        print(f"Fetching tokenizer: {name}")
        tokenizer = AutoTokenizer.from_pretrained(name)
        print(f"Saving tokenizer to path: {path}")
        tokenizer.save_pretrained(path)
        print("Saved!")


if __name__ == "__main__":
    fetchModel("cardiffnlp/twitter-roberta-base-sentiment-latest", "./models/analyzer")
    fetchModel("bhadresh-savani/distilbert-base-uncased-emotion", "./models/classifier")
    fetchModel("facebook/bart-large-cnn", "./models/summarizer")
