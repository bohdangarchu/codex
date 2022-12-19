from api_wrapper import ApiWrapper

def send_js_code():
    output = ApiWrapper().send_code(
        code="while(true) { console.log('output'); }",
        langId=1
    )
    stderr = output['output']['stderr']
    print(stderr)

if __name__ == '__main__':
    send_js_code()