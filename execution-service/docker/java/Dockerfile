# syntax=docker/dockerfile:1

FROM rappdw/docker-java-python:openjdk1.8.0_171-python3.6.6

WORKDIR /app

RUN mkdir src

COPY . .

ENTRYPOINT ["python3", "main.py"]
