from api_wrapper import ApiWrapper

def send_failing_js_code():
    output = ApiWrapper().send_code(
        code="console.log('output:' + x);",
        langId=1
    )
    stderr = output['output']['stderr']
    print(stderr)

def send_failing_python_code():
    output = ApiWrapper().send_code(
        code="print(x)",
        langId=2
    )
    stderr = output['output']['stderr']
    print(stderr)


if __name__ == '__main__':
    send_failing_js_code()
