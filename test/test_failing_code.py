from api_wrapper import ApiWrapper

def send_failing_js_code():
    code = "console.log('output:' + x);"
    output = ApiWrapper().send_code(
        code=code,
        langId=1
    )
    stderr = output['output']['stderr']
    print('output for code')
    print(code)
    print('---------')    
    print(stderr)

def send_failing_python_code():
    code = "print(x)"
    output = ApiWrapper().send_code(
        code=code,
        langId=2
    )
    stderr = output['output']['stderr']
    print('output for code')
    print(code)
    print('---------')
    print(stderr)


if __name__ == '__main__':
    send_failing_js_code()
