const express = require('express')
const router = express.Router()
const multer = require('multer')
const model = require('../model/lecture.model')
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"lecture")
    },filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const upload = multer({storage:storage,limits: { fileSize: '500000000' },  fileFilter: (req, file, cb) => {
    const fileTypes = /mp4|mov|wmv|avi|avchd|flv|f4v|swf|mkv|webm|mpeg-2/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
  
    cb("Error: El archivo debe ser una imagen válida");
  }})
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

router.post('/addlecture', upload.single('lecture'),bodyParser.urlencoded({extended:true}),function (req, res) {
    model.saveLecture(req.headers.data,req.file.originalname,req.body.name).then(()=>{
    res.end();
    })
  })


  router.post('/getlecture',bodyParser.urlencoded({extended:true}),(req,res)=>{
    model.getLecture(req.body.teacher).then((teacher)=>{
        let lessons = teacher.lessons
        let fileName = teacher.fileName 
        if(lessons.length>=1 && fileName.length >=1){
            res.json({lessons:lessons,fileName:fileName})
        }else{
            res.json({lessons:null,fileName:null})
        }
        res.end();
    })
  })


  module.exports = router