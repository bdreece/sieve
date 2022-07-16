# sieve - Sifting through the news with NLP models
# Copyright (C) 2022 Brian Reece
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.


from flask import Flask, request
from flask_cors import CORS, cross_origin
from transformers import pipeline

from analyzer import get_analyzer
from classifier import get_classifier
from summarizer import get_summarizer

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

analyzer = get_analyzer()
classifier = get_classifier()
summarizer = get_summarizer()


@app.route("/summary", methods=["POST", "OPTIONS"])
@cross_origin()
def getSummary():
    content = request.json["content"]
    max_length = request.json["maxLength"]
    return {
        "summary": summarizer(
            content, max_length=max_length, min_length=30, do_sample=False
        )["summary_text"]
    }


@app.route("/sentiment", methods=["POST", "OPTIONS"])
@cross_origin()
def getSentiment():
    content = request.json["content"]
    sentiment = analyzer(content)
    return {
        "sentiment": sentiment["label"],
    }


@app.route("/emotion", methods=["POST", "OPTIONS"])
@cross_origin()
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
