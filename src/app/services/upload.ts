import fs from 'fs'
import path from 'path'
import multer from 'koa-multer'


class Upload {
    storage: any
    upload: any

    constructor(des: string) {
        this.storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, path.resolve(__dirname, `../../public/${des}/`))
            },
            filename(req: any, file: multer.File, callback: (error: (Error | null), filename: string) => void) {
                const fileFormat = (file.originalname).split('.')
                callback(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
            }
        })
        this.upload = multer({storage: this.storage})
    }

    static transferToImg(base64: string, name: string) {
        let base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
        let dataBuffer = new Buffer(base64Data, 'base64')
        let targetPath = path.resolve(__dirname, '../../public/images/avatar/')
        fs.writeFileSync(`${targetPath}/${name}`, dataBuffer);
    }
}

export {
    Upload
}
