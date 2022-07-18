FROM huggingface/transformers-cpu

# Setup user and workspace
RUN adduser --home /home/user --shell /bin/bash user && \
    echo user:password | chpasswd
USER user
WORKDIR /usr/src/sieve
ENV PATH=$PATH:/home/user/.local/bin

RUN pip3 install --user --no-cache --upgrade pip setuptools

# Install dependencies
COPY requirements.txt .
RUN pip3 install --user -r ./requirements.txt -f https://download.pytorch.org/whl/cpu/torch_stable.html

# Move sources
COPY ./*.py .

# Fetch Hugging Face models
RUN python3 fetchModels.py

# Launch server
CMD ["gunicorn", "-b", "0.0.0.0:${PORT}", "app:app"]
