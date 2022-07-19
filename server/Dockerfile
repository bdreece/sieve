FROM huggingface/transformers-cpu
WORKDIR /usr/src/sieve

# Install dependencies
RUN pip3 install flask flask-cors gunicorn

# Move sources
COPY ./*.py ./
RUN mkdir -p ./models/analyzer ./models/summarizer ./models/classifier

# Fetch Hugging Face models
RUN python3 fetchModels.py

# Launch server
ENV PORT=8080
CMD ["gunicorn", "app:app"]
