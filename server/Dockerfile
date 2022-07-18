FROM huggingface/transformers-cpu

# Setup user and workspace
RUN adduser --home /home/user --shell /bin/bash user && \
    echo user:password | chpasswd
USER user
WORKDIR /usr/src/sieve
ENV PATH=$PATH:/home/user/.local/bin

RUN pip3 install --user --no-cache --upgrade pip setuptools

# Install dependencies
RUN pip3 install --user flask flask-cors "transformers[torch]"

# Move sources
COPY ./*.py ./
RUN mkdir -p ./models/analyzer ./models/summarizer ./models/classifier


# Fetch Hugging Face models
RUN python3 fetchModels.py

# Launch server
CMD ["gunicorn", "-b", "0.0.0.0:${PORT}", "app:app"]
