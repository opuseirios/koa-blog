import Router from 'koa-router'
import {LoginValidator, UpdateValidator} from "../validators/validator";
import {User} from "../models/user";
import {Auth} from "../../middlewares/auth";
import {Upload} from "../services/upload";

const router = new Router({prefix: '/user'})

//登录
router.post('/login', async ctx => {
    const v = await new LoginValidator().validate(ctx)
    const user = {
        username: v.get('body.username'),
        password: v.get('body.password')
    }
    const token = await User.registerOrLogin(user)
    throw new global.errs.Success({token})
})

//更新
router.post('/update', new Auth().m, async ctx => {
    const v = await new UpdateValidator().validate(ctx)
    const user = {
        username: v.get('body.username'),
        avatar: v.get('body.avatar'),
        summary: v.get('body.summary'),
        sex: v.get('body.sex')
    }
    await User.updateUserInfo(user)
})

//用户信息
// @ts-ignore
router.get('/info', new Auth().m, async ctx => {
    const info = Auth.decodeToken(ctx)
    //@ts-ignore
    const uid = info!.payload.uid;
    const userInfo = await User.findByPk(uid)
    //@ts-ignore
    const filelink = `http://${global.config.host}:${global.config.port}/images/avatar/${userInfo!.avatar}`
    //@ts-ignore
    userInfo.dataValues.filelink = filelink
    throw new global.errs.Success(userInfo!)
})

router.post('/upload', async ctx => {
    //@ts-ignore
    const {base64, filename} = ctx.request.body;
    Upload.transferToImg(base64, filename)
    throw new global.errs.Success();
})


export default router;
