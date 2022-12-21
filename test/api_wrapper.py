from typing import Dict
import requests
import time

URL = 'http://localhost:7000/submissions'

class ApiWrapper:
    def send_code_old(self, code: str, langId: int) -> Dict[str, str]:
        sub = {
            "code": code,
            "langId": langId
        }
        response = requests.post(URL, json=sub)
        data = response.json()
        id = data['submissionId']
        time.sleep(5)
        while True:
            output = requests.get(f'{URL}/{id}').json()[0]
            if output['status'] == 'Finished':
                return output
            time.sleep(1)

    def send_code(self, code: str, langId: int) -> Dict[str, str]:
        sub = {
            "code": code,
            "langId": langId
        }
        response = requests.post(URL, json=sub)
        return response.json()