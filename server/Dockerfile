FROM alpine:latest

WORKDIR /usr/src/sieve

RUN apk add --update --no-cache python3 && \
    ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

COPY requirements.txt .

RUN pip3 install -r ./requirements.txt

COPY ./*.py .

RUN python3 fetchModels.py

CMD ["gunicorn", "server:app"]