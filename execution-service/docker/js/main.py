import subprocess
import sys
import json

def write_code_to_file(code):
   file = open('./src/main.js', 'x')
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
                ['node', './src/main.js'], 
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