from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline


def get_analyzer(mode):
    if mode == "development":
        path = "./models/analyzer"
        model = AutoModelForSequenceClassification.from_pretrained(path)
        tokenizer = AutoTokenizer.from_pretrained(path)
        return pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
    else:
        return None
