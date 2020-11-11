const config = {
    environment:'dev',
    port:9020,
    database:{
        dbName: 'myblog',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'tomato2017'
    },
    security:{
        secretKey:'seirios',
        expiresIn:60*60*24*30
    },
}

export default config;
