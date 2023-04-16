# CodeX

CodeX is a remote code execution system. It currently supports submissions in Python, JavaScript and Java. The REST API is built using Node.js and Express.js and uses Docker containers as sandbox environment.

## Architecture

CodeX uses a microservices architecture to handle requests and execute code. The application is composed of the following services:

- **API Service**: This service is responsible for handling incoming HTTP requests and responding with the appropriate data. It is built using Node.js and Express.js. After receiving a request with a submission, the service stores it in the database and pushes it to the task queue.

- **Execution Service**: This service is responsible for executing submitted code. It is built using Node.js and uses Docker containers as a sandbox environment. The service waits for incomming submissions in the Task Queue.

CodeX leverages Docker as a sandbox environment for code submissions because it provides a secure and isolated environment for executing user code. When a user submits code to CodeX, it is executed within a Docker container, which has its own file system, network stack, and resource limits. This ensures that any malicious or poorly written code submitted by users cannot harm the host system. In addition, using Docker also provides portability and scalability to the service, as it allows the application to be run on any machine that has Docker installed.

RabbitMQ is used as the message broker between the API Service and the Execution Service. This allows for a decoupled architecture where the API Service can send messages to the Execution Service without having to know anything about its implementation details.

MongoDB is used as the database for CodeX. This provides a scalable and reliable way to store and retrieve data related to executed code.

## Prerequisites

Before getting started, you will need to have Docker installed on your machine. You can download Docker from the official website: https://www.docker.com/get-started

## Getting Started
To get started, clone this repository to your local machine and run the setup script. This will build the Docker containers and start the RabbitMQ and MongoDB instances:

```bash
git clone https://github.com/bohdangarchu/codex.git
cd codex
./setup.sh
```

Once the setup is complete, you can start the API server by running the following command:

```bash
./run.sh
```


The API will be available at `http://localhost:7000` by default, but you can customize the port by setting the `PORT` environment variable in the `api/.env` file.

## API Endpoints

- `POST /submissions`: submits code for execution. Returns a submission object with id and output.
- `GET /submissions/:submissionId`: retrieves the result of a specific submission.

## Usage

The API currently supports execution of code in the following languages:

- Python
- JavaScript
- Java

To execute code in any of these languages, send a POST request to the `/submissions` endpoint with the following JSON payload:

```bash
curl -H 'Content-Type: application/json' \
-d '{ "code": "<your code>", "langId": <langId>' \
-X POST http://localhost:7000/submissions
```

The response looks like this:

```json
{
    "_id": "<submission id>",
    "stdout": "<your output>",
    "stderr": "<errors>",
    "timeout": false
}
```

Default timeout is 10s. Custom timeout will be added in the future.

You can see the available programming languages and the corresponding `langId`s in the `static/languages.json` file.

Request examples:

```bash
curl -H 'Content-Type: application/json' \
      -d '{ "code": "x = 4\nprint(x+5);", "langId": 2}' \
      -X POST \
      http://localhost:7000/submissions
```

Response:
```json
{
    "_id": "63619ee6546b4cfab2945b93",
    "stdout": "9\n",
    "stderr": "",
    "timeout": false
}
```





