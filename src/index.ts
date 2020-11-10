import Koa from 'koa'
import bodyParser from "koa-bodyparser";
import {catchError} from "./middlewares/exception";
import './types/global'

const app = new Koa();

//抛出异常
app.use(catchError);
app.use(bodyParser())

app.listen(7000,()=>{
    console.log('server is running at port 7000')
})
