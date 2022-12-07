import requests
import time

URL = 'http://localhost:7000/submissions'

def test_success():
    sub1 = {
        "code": "var x = 1; \n console.log('output:' + x); \n console.log('second output');",
        "langId": 1
    }

    response = requests.post(URL, json=sub1)
    data = response.json()
    print(data)
    id = data['submissionId']

    time.sleep(5)
    output = requests.get(f'{URL}/{id}')
    print(output.json())
    stdout = output.json()[0]['output']['stdout']
    print(stdout)
    assert stdout == 'output:1\nsecond output'

