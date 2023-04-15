# Code Execution API

Code Execution API is a RESTful API that allows users to execute code in various programming languages. It currently supports Python, JavaScript and Java. This API is built using Node.js and Express.js and uses Docker containers as runtime environment.

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
    "stdout": "9",
    "stderr": "",
    "timeout": false
}
```





