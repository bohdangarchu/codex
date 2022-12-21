

import os
from pathlib import Path
import subprocess
from typing import List

def build_js_code_runner():
    # copy dockerfile to temp
    dockerfile = read_dockerfile()
    write_file_to_temp_dir("Dockerfile", dockerfile)
    # write main.py to temp
    main = get_main('index.js', ['node', './src/index.js'])
    write_file_to_temp_dir('main.py', main)
    # run docer build
    res = subprocess.run(
                'docker build --tag js-code-runner ./execution-service/docker/temp'.split(' '), 
                stdout=subprocess.PIPE
            )
    print(res)
    # remove temp dir


def write_file_to_temp_dir(filename: str, content: str):
    docker_dir_path = Path(os.path.dirname(__file__)).parent
    docker_dir_path.joinpath('temp').mkdir(exist_ok=True)
    path = str(docker_dir_path.joinpath('temp').joinpath(filename))
    f = open(path, "w")
    f.write(content)
    f.close

def read_dockerfile() -> str:
    path = str(Path(os.path.dirname(__file__)).parent.joinpath('templates').joinpath('Dockerfile'))
    f = open(path, "r")
    result = f.read()
    f.close()
    return result

def get_main(filename_in_sandbox: str, run_command: List[str]) -> str:
    result = '''
import subprocess
import sys
import json

def write_code_to_file(code):
   file = open('./src/
   ''' + filename_in_sandbox + \
   '''
   ', 'x')
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
'''




if __name__ == '__main__':
    filename = 'main.py'
    cmd = ['python', './src/main.py']
    # build_js_code_runner()
    print(get_main("vsvs", 'sdvsvd'))