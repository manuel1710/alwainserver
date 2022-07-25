const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url:process.env.DB,
    options:{useNewUrlParser:true, useUnifiedTopology:true},
    file: (req,file) =>{
        const match = ["image/png", "image/jpeg", "image/jpg","image/*"];

        if(match.indexOf(file.mimetype)=== -1){
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            // const uploadDate = `${Date()}`;
            return (filename,uploadDate);
        }

        return{
            bucketName:'photos',
            uploadDate: `${Date.toString()}`,
            filename: `${Date.now()}-any-name-${file.originalname}`
        }
    }
})

module.exports = multer({storage})