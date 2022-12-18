import subprocess
import sys

def write_code_to_file(code):
   file = open('./src/main.py', 'x')
   file.write(code)
   file.close()


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('no codeId was given')
        exit()
    code = sys.argv[1]
    write_code_to_file(code)
    timeout = 10
    try:
        res = subprocess.run(
                ['python', './src/main.py'], 
                stdout=subprocess.PIPE, 
                timeout=timeout
            )
        print(res.stdout.decode('utf-8'))
    except subprocess.TimeoutExpired:
        print(f'Timeout ({timeout}s)')