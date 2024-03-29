# CodeX

CodeX is a remote code execution system. It runs code submissions in a secure envoronment and returns the output. The system currently supports submissions in Python, JavaScript and Java. The REST API is built using `Node.js` and `Express.js`.


CodeX leverages `Docker` as a sandbox environment for code submissions because it provides a secure and isolated environment for executing untrusted code.

`RabbitMQ` is used as a message broker between the API Service and the Execution Service.

## Prerequisites

Before getting started, you will need to have Docker and Node.js installed on your machine.

## Getting Started
To get started, clone this repository to your local machine and run the setup script. This will install npm packages, build Docker containers needed for code execution and start the RabbitMQ and MongoDB instances:

```bash
git clone https://github.com/bohdangarchu/codex.git
cd codex
./setup.sh
```

Once the setup is complete, you can start the service by running the following command:

```bash
./run.sh
```


The API will be available at `http://localhost:7000` by default, but you can customize the port by setting the `PORT` environment variable in the `api/.env` file.

## API Endpoints

- `POST /submissions`: submits code for execution. Returns a submission object with id and output.
- `GET /submissions/{submissionId}`: retrieves the result of a specific submission.

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





