#!/bin/bash
docker build --tag js-code-runner ./execution-service/docker/js
docker build --tag python-code-runner ./execution-service/docker/python
docker run --name test-mongo -d -p 27017:27017 mongo
docker run --name rmq -p 5672:5672 rabbitmq
