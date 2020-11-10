//捕获服务器异常
class HttpException extends Error{
    msg: string;
    errorCode: number;
    code: number;
    constructor(msg='服务器异常',errorCode=10000,code=400) {
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.code = code;
    }
}

//参数错误
class ParameterException extends HttpException{
    constructor(msg='参数错误',errorCode=1000) {
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.code = 400;
    }
}

export {
    HttpException,
    ParameterException
}
