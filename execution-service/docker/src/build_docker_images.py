

import os
from pathlib import Path
from typing import List


if __name__ == '__main__':
    filename = 'main.py'
    cmd = ['python', './src/main.py']

def write_file_to_dir(filename: str, content, str):
    docker_dir_path = Path(os.path.dirname(__file__)).parent
    docker_dir_path.joinpath('temp').mkdir(exist_ok=True)
    # copy dockerfile to temp
    # write main.py to temp
    # run docer build

def get_main(filename: str, run_command: List[str]) -> str:
    return f"""
import subprocess
import sys
import json

def write_code_to_file(code):
   file = open('./src/{filename}', 'x')
   file.write(code)
   file.close()


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('no input was given')
        exit()
    code = sys.argv[1]
    write_code_to_file(code)
    timeout = 10
    try:
        res = subprocess.run(
                {run_command}, 
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=timeout
            )
        output = {
            "stdout": res.stdout.decode('utf-8'),
            "stderr": res.stderr.decode('utf-8'),
            "timeout": False
        }
        print(json.dumps(output))
    except subprocess.TimeoutExpired:
        print(json.dumps({
            "stdout": "",
            "stderr": "",
            "timeout": True
        }))
"""