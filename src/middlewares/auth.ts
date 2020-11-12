import {Context, Next} from 'koa'
import jwt from 'jsonwebtoken'
import basicAuth from 'basic-auth'

interface IDecode {
    uid: string | number
    scope: string | number
}

class Auth {
    static User: number
    static Admin: number
    static SUPER_ADMIN: number
    level: number

    constructor(level = 1) {
        this.level = level
        Auth.User = 8
        Auth.Admin = 16
        Auth.SUPER_ADMIN = 32
    }

    get m() {
        return async (ctx: Context, next: Next) => {
            const userToken = basicAuth(ctx.req)
            let errMsg = '不合法'
            let decode: IDecode
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbidden(errMsg)
            }
            try {
                decode = (jwt.verify(userToken!.name, global.config.security.secretKey) as IDecode)
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbidden(errMsg)
            }
            if (decode.scope < this.level) {
                errMsg = '权限不足'
                throw new global.errs.Forbidden(errMsg)
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }

    static verifyToken(token: string) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true
        } catch (e) {
            return false
        }
    }

    static generateToken(uid: number | string, scope: number | string) {
        const secretKey = global.config.security.secretKey
        const expiresIn = global.config.security.expiresIn
        return jwt.sign({
            uid,
            scope
        }, secretKey, {
            expiresIn
        })
    }

    static decodeToken(ctx:Context) {
        try {
            const userToken = basicAuth(ctx.req)
            return jwt.decode(userToken!.name, {complete: true})
        } catch (e) {
            throw e;
        }
    }
}

export {
    Auth
}
