import requests
import time

URL = 'http://localhost:7000/submissions'

def send_js_code():
    sub = {
        "code": "while(true) { console.log('output'); }",
        "langId": 1
    }
    response = requests.post(URL, json=sub)
    data = response.json()
    print(data)
    id = data['submissionId']
    time.sleep(11)
    output = requests.get(f'{URL}/{id}')
    stderr = output.json()[0]['output']['stderr']
    print(stderr)

if __name__ == '__main__':
    send_js_code()