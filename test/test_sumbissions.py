import requests
import time

URL = 'http://localhost:7000/submissions'

def test_success_js():
    sub1 = {
        "code": "var x = 1; \n console.log('output:' + x); \n console.log('second output');",
        "langId": 1
    }
    response = requests.post(URL, json=sub1)
    data = response.json()
    id = data['submissionId']
    time.sleep(5)
    output = requests.get(f'{URL}/{id}')
    stdout = output.json()[0]['output']['stdout']
    assert stdout == 'output:1\nsecond output'


def test_success_python():
    sub1 = {
        "code": "x = 1\ny = 2\nprint(f'output: {x+y}')",
        "langId": 2
    }
    response = requests.post(URL, json=sub1)
    data = response.json()
    id = data['submissionId']
    time.sleep(5)
    output = requests.get(f'{URL}/{id}')
    stdout = output.json()[0]['output']['stdout']
    assert stdout == 'output: 3'

