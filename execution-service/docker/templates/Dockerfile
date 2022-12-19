# syntax=docker/dockerfile:1

FROM nikolaik/python-nodejs:latest
WORKDIR /app

RUN mkdir src

COPY . .

ENTRYPOINT ["python3", "main.py"]
