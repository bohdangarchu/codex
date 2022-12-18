import requests
import time

URL = 'http://localhost:7000/submissions'

def send_failing_js_code():
    sub = {
        "code": "console.log('output:' + x);",
        "langId": 1
    }
    response = requests.post(URL, json=sub)
    data = response.json()
    print(data)
    id = data['submissionId']
    time.sleep(6)
    output = requests.get(f'{URL}/{id}')
    stderr = output.json()[0]['output']['stderr']
    print(stderr)

def send_failing_python_code():
    sub = {
        "code": "print(x)",
        "langId": 2
    }
    response = requests.post(URL, json=sub)
    data = response.json()
    print(data)
    id = data['submissionId']
    time.sleep(5)
    output = requests.get(f'{URL}/{id}')
    stderr = output.json()[0]['output']['stderr']
    print(stderr)


if __name__ == '__main__':
    send_failing_python_code()
