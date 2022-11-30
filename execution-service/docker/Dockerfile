# syntax=docker/dockerfile:1

# FROM python:3.8-slim-buster
FROM nikolaik/python-nodejs:latest
WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN mkdir src

COPY . .

# CMD [ "python3", "main.py"]
ENTRYPOINT ["python3", "main.py"]
