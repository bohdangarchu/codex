from api_wrapper import ApiWrapper


def test_python_code():
    code = "f = open('myfile.txt', 'x')\nf.write('test')\nf.close()\nf = open('myfile.txt', 'r')\nprint(f.read())"
    output = ApiWrapper().send_code(
        code=code,
        langId=2
    )
    stdout = output['output']['stdout']
    print('output for code')
    print(code)
    print('---------')
    print(stdout)
    print('error:' + output['output']['stderr'])

if __name__ == '__main__':
    test_python_code()
