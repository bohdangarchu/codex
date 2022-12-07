docker build --tag js-code-runner ./execution-service/docker/js
docker build --tag python-code-runner ./execution-service/docker/python
docker start test-mongo
docker run --name rmq -p 5672:5672 rabbitmq
