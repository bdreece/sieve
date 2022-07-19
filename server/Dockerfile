FROM huggingface/transformers-cpu

WORKDIR /usr/src/sieve

# Install dependencies
RUN pip3 install virtualenv
RUN virtualenv /opt/venv
RUN /opt/venv/bin/pip3 install --user flask flask-cors gunicorn

# Move sources
COPY ./*.py ./
RUN mkdir -p ./models/analyzer ./models/summarizer ./models/classifier

# Fetch Hugging Face models
RUN /opt/venv/bin/python3 fetchModels.py

ENV PORT=8080

# Launch server
CMD ["/opt/venv/bin/gunicorn", "-b", ":$PORT", "app:app"]
