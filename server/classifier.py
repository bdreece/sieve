from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline


def get_classifier(mode):
    if mode == "development":
        path = "./models/classifier"
        model = AutoModelForSequenceClassification.from_pretrained(path)
        tokenizer = AutoTokenizer.from_pretrained(path)
        return pipeline("text-classification", model=model, path=path, top_k=1)
    else:
        return None
