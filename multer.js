let multer = require("multer")
let {v4:uuid} = require("uuid")

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,"./uploads")
    },
    filename(req,file,cb){
        const id = uuid()
        const extention = file.originalname.split(".").pop();
        const fileName = `${id}.${extention}`;
        cb(null,fileName)
    }
})

const uploadFiles = multer({storage}).single("resume");


module.exports = uploadFiles