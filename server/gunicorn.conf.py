import multiprocessing
from os import environ

port = environ.get("PORT")
if port is None:
    port = 8080
bind = f":{port}"
workers = multiprocessing.cpu_count() * 2 + 1
