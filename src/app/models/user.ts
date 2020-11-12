// @ts-ignore
import bcrypt from 'bcryptjs'
import {DataTypes,Model} from 'sequelize'
import {sequelize} from "../../core/db";
import {LoginParams,UpdateInfoParams} from "../../types/params";
import {Auth} from "../../middlewares/auth";

class User extends Model{
    //注册用户
    static async registerOrLogin({username,password}:LoginParams){

        const user = await User.findOne({
            where:{
                username
            }
        })
        if(!user){
            const newUser = await User.create({
                username,
                password
            })
            return Auth.generateToken(newUser.getDataValue('id'),2);
        }
        const correct = bcrypt.compareSync(password,user!.getDataValue('password'))
        if(!correct){
            throw new global.errs.LoginFailed('账号已注册或密码不正确')
        }
        console.log(Auth.generateToken(user.getDataValue('id'),2))
        return Auth.generateToken(user.getDataValue('id'),2);
    }
    //更新
    static async updateUserInfo(info:UpdateInfoParams){
        const user = User.findOne({
            where:{username:info.username}
        })
        if(!user){
            throw new global.errs.NotFound('用户未注册，请先注册')
        }
        const result = await User.update(info,{
            where: {username: info.username}
        })
        if(!result){
            throw new global.errs.HttpException('更新失败')
        }
        throw new global.errs.Success()
    }
}
User.init({
    username:{
        type: DataTypes.STRING(32),
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        set(val:string){
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val,salt)
            this.setDataValue('password',psw)
        }
    },
    avatar: {
        type:DataTypes.STRING,
        defaultValue: ''
    },
    motto: {
        type:DataTypes.STRING,
        defaultValue: ''
    },
    birthday: {
        type:DataTypes.STRING,
        defaultValue: ''
    }
},{
    tableName: 'user',
    sequelize
})

export {User}
