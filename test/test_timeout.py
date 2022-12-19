from api_wrapper import ApiWrapper

def send_js_code():
    code = "while(true) { console.log('output'); }"
    output = ApiWrapper().send_code(
        code=code,
        langId=1
    )
    stderr = output['output']['stderr']
    print('output for code')
    print(code)
    print('---------')
    print(stderr)

if __name__ == '__main__':
    send_js_code()