from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline

def get_summarizer(mode):
    if mode == "development":
        path = "./models/summarizer"
        model = AutoModelForSequenceClassification.from_pretrained(path)
        tokenizer = AutoTokenizer.from_pretrained(path)
        return pipeline("summarization", model=model, tokenizer=tokenizer)
    else:
        # Implement Google Cloud Bucket stuff
        return None
