import {Context} from 'koa'
import {LinValidator, Rule} from "../../core/lin-validator-v2";
import {User} from '../models/user'

//校验注册参数
class LoginValidator extends LinValidator {
    username: Rule[]
    password: Rule[]

    constructor() {
        super();
        this.username = [
            new Rule('isLength', '昵称至少4个字符，最多32个字符', {min: 4, max: 32})
        ]
        this.password = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {min: 6, max: 32}),
            new Rule('matches', '密码不符合规则', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
    }
}

// 更新参数校验
class UpdateValidator extends LinValidator{
    avatar:Rule[]
    summary:Rule[]
    sex: Rule[]
    constructor() {
        super();
        this.avatar = [
            new Rule('isLength','请上传图片')
        ]
        this.summary = [
            new Rule('isLength','请填写个人简介')
        ]
        this.sex = [
            new Rule('isLength','请选择性别')
        ]
    }
}

export {
    LoginValidator,
    UpdateValidator
}
