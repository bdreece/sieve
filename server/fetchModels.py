from transformers import AutoModelForSequenceClassification, AutoTokenizer


def fetchModel(name, path):
    print(f"Fetching model: {name}")
    model = AutoModelForSequenceClassification.from_pretrained(name)
    print(f"Saving model to path: {path}")
    model.save_pretrained(path)
    print("Saved!")
    print(f"Fetching tokenizer: {name}")
    tokenizer = AutoTokenizer.from_pretrained(name)
    print(f"Saving tokenizer to path: {path}")
    tokenizer.save_pretrained(path)
    print("Saved!")


if __name__ == "__main__":
    fetchModel("cardiffnlp/twitter-roberta-base-sentiment-latest", "./models/analyzer")
    fetchModel("bhadresh-savani/distilbert-base-uncased-emotion", "./models/classifier")
    fetchModel("facebook/bart-large-cnn", "./models/summarizer")
