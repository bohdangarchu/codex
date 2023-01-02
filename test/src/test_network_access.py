from api_wrapper import ApiWrapper

def test_python_code():
    code = "from urllib.request import urlopen\nprint(urlopen('https://realpython.com/urllib-request/'))"
    output = ApiWrapper().send_code(
        code=code,
        langId=2
    )
    print('code:')
    print(code)
    print('output:')
    print(output['output']['stdout'])
    print('error:')
    print(output['output']['stderr'])


if __name__ == '__main__':
    test_python_code()
