// const upload = require("../middlewares/upload");
const multer = require("multer");
const router = require("express").Router();
var mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');
const fs = require('fs');
const path = require('path') 
const Buffer = require('buffer').Buffer;

var imageSchema = require('../model');


//storage area for uploads
// const storage = multer.diskStorage({
//     destination: (req,file,cb) =>{
//         cb(null,'uploads')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })
// const upload = multer({storage:storage});

// Create a storage object with a given configuration
const storage = new GridFsStorage({ url:process.env.DB });

// Set multer storage engine to the newly created object
const upload = multer({ storage:storage });


router.post("/upload", upload.single("file"),(req,res)=>{
// router.post("/upload",(req,res)=>{
    // console.log(Date().toString());
    const saveImage = new imageSchema({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        tag: req.body.folder,
        uploadDate: Date().toString(),
        originalname: req.file.originalname,
        img:
        {
        // data: Buffer.from(JSON.stringify(path.join(__dirname,req.file.originalname))),
        // data: Buffer.from(path.join(__dirname,req.file.originalname)),
        // data: fs.readFileSync(path.join(__dirname,'..','uploads', req.file.originalname)),
        // data: fs.readFileSync(path.join(process.env.DB,'fs.files', req.file.originalname)),
        data: req.file,
        // data: fs.readFileSync(req.file),
        contentType: req.file.mimetype,
        },
    });
    // console.log(saveImage.img.data);
    saveImage.save().then((res)=>{
        console.log('image is saved');
        // console.log(saveImage.img.data);
    })
    .catch((err)=>{
        console.log(err, 'error has occured');
    });
    res.send(['Image is Saved',saveImage.img.data, typeof(req.file)]);
    // res.send((req.file.filename));

    // if(req.file === undefined) return res.send("you must select a file.");
    // const imgUrl = `http://localhost:5000/${req.file.filename}__${req.file.uploadDate}`
    // return res.send(imgUrl);
    // return res.status(201).send({ message: "Photo uploaded Successfully" });
})
module.exports = router;