import subprocess
import sys

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
                timeout=timeout
            )
        print(res.stdout.decode('utf-8'))
    except subprocess.TimeoutExpired:
        print(f'Timeout ({timeout}s)')