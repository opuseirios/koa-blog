import Koa from 'koa'
import bodyParser from "koa-bodyparser";
import {catchError} from "./middlewares/exception";
import './types/global'
import router from './app/api'
import config from './config'

const app = new Koa();

//抛出异常
app.use(catchError);
app.use(bodyParser())
router(app)

app.listen(config.port,()=>{
    console.log(`server is running at port ${config.port}`)
})
