docker build --tag code-runner ./execution-service/docker
docker start test-mongo
docker run --name rmq -p 5672:5672 rabbitmq
