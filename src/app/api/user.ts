import Router from 'koa-router'
import {LoginValidator, UpdateValidator} from "../validators/validator";
import {User} from "../models/user";
import {Auth} from "../../middlewares/auth";

const router = new Router({prefix: '/user'})

//登录
router.post('/login',async ctx=>{
    const v = await new LoginValidator().validate(ctx)
    const user = {
        username: v.get('body.username'),
        password: v.get('body.password')
    }
    const token = await User.registerOrLogin(user)
    throw new global.errs.Success({token})
})

//更新
router.post('/update',new Auth().m,async ctx=>{
    const v = await new UpdateValidator().validate(ctx)
    const user = {
        username: v.get('body.username'),
        avatar:v.get('body.avatar'),
        motto: v.get('body.motto'),
        birthday: v.get('body.birthday')
    }
    await User.updateUserInfo(user)
})

//用户信息
router.get('/info', new Auth().m, async ctx=>{
    const info = Auth.decodeToken(ctx)
    //@ts-ignore
    const uid = info!.payload.uid;
    const userInfo = await User.findByPk(uid)
    throw new global.errs.Success(userInfo!)
})


export default router;
