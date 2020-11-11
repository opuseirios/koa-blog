import Router from 'koa-router'
import {LoginValidator} from "../validators/validator";
import {User} from "../models/user";

const router = new Router({prefix: '/user'})

router.post('/login',async ctx=>{
    const v = await new LoginValidator().validate(ctx)
    const user = {
        username: v.get('body.username'),
        password: v.get('body.password')
    }
    await User.registerOrLogin(user)
    throw new global.errs.Success()
})


export default router;
