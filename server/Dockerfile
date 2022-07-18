FROM huggingface/transformers-cpu

WORKDIR /usr/src/sieve

# Install dependencies
RUN pip3 install --user flask flask-cors

# Move sources
COPY ./*.py ./
RUN mkdir -p ./models/analyzer ./models/summarizer ./models/classifier

# Fetch Hugging Face models
RUN python3 fetchModels.py

# Launch server
CMD ["gunicorn", "-b", "0.0.0.0:${PORT}", "app:app"]
