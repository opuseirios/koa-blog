import bcrypt from 'bcryptjs'
import {DataTypes,Model} from 'sequelize'
import {sequelize} from "../../core/db";
import {LoginParams} from "../../types/params";
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
            const token =  Auth.generateToken(newUser.getDataValue('id'),2);
            throw new global.errs.Success({token})
        }
        const correct = bcrypt.compareSync(password,user!.getDataValue('password'))
        if(!correct){
            throw new global.errs.LoginFailed('密码不正确')
        }
        const token =  Auth.generateToken(user.getDataValue('id'),2);
        throw new global.errs.Success({token})
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
    }
},{
    tableName: 'user',
    sequelize
})

export {User}
