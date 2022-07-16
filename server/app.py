from flask import Flask, request
from transformers import pipeline

from analyzer import get_analyzer
from classifier import get_classifier
from summarizer import get_summarizer

app = Flask(__name__)
analyzer = get_analyzer("development")
classifier = get_classifier("development")
summarizer = get_summarizer("development")


@app.post("/summary")
def getSummary():
    content = request.json["content"]
    max_length = request.json["maxLength"]
    return {
        "summary": summarizer(
            content, max_length=max_length, min_length=30, do_sample=False
        )["summary_text"]
    }


@app.post("/sentiment")
def getSentiment():
    content = request.json["content"]
    sentiment = analyzer(content)
    return {
        "sentiment": sentiment["label"],
    }


@app.post("/emotion")
def getEmotion():
    content = request.json["content"]
    emotions = classifier(content)
    max_emotion = ""
    max_score = 0.0
    for emotion in emotions:
        this_score = emotion["score"]
        if this_score > max_score:
            max_score = this_score
            max_emotion = emotion["label"]
    return {
        emotion: max_emotion,
    }
