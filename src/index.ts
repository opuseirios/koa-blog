import path from 'path'
import Koa from 'koa'
import bodyParser from "koa-bodyparser";
import KoaStatic from 'koa-static'
import {catchError} from "./middlewares/exception";
import './types/global'
import router from './app/api'
import config from './config'

const app = new Koa();

//抛出异常
app.use(catchError);
app.use(bodyParser({
    formLimit: '10mb',
    jsonLimit: '10mb'
}))
app.use(KoaStatic(path.resolve(__dirname, './public')));
router(app)

app.listen(config.port, () => {
    console.log(`server is running at port ${config.port}`)
})
