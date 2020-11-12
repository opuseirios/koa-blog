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
        this.code = 200;
    }
}

//认证失败
class LoginFailed extends HttpException{
    constructor(msg='登录失败',errorCode=10004) {
        super();
        this.msg = msg
        this.errorCode = errorCode
        this.code = 200;
    }
}

//成功
class Success extends HttpException{
     data: object;
    constructor(data={},msg='ok', errorCode=0) {
        super();
        this.code = 200;
        this.msg = msg;
        this.errorCode = errorCode
        this.data = data;
    }
}

//禁止
class Forbidden extends HttpException{
    constructor(msg='没有权限',errorCode=403) {
        super();
        this.code = 200
        this.msg = msg
        this.errorCode = errorCode
    }
}

//没找到资源
class NotFound extends HttpException{
    constructor(msg='资源未找到',errorCode=404) {
        super();
        this.msg = msg;
        this.errorCode = errorCode
        this.code = 200;
    }
}

export {
    HttpException,
    ParameterException,
    LoginFailed,
    Success,
    Forbidden,
    NotFound
}
