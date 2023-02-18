const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
      cb(null,"tasks")
  },filename:(req,file,cb)=>{
      cb(null,file.originalname);
  }
})

const upload = multer({storage:storage,limits: { fileSize: '5000000' },  fileFilter: (req, file, cb) => {
  const fileTypes = /pdf/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: El archivo debe ser una imagen válida");
}})

const express = require('express')
const router = express.Router()
const model = require('../model/addTask.model')

const bodyParser = require('body-parser')


router.post('/addtask', bodyParser.urlencoded({extended:true}),async function (req, res) {
    let teacherName = req.body.teacherName;
    let degreeOfTask = {taskName:req.body.name,taskDegree:req.body.taskDegree,taskDetail:req.body.task,taskLastTime:req.body.tasklasttime,location:null,stuDegree:null}
   await model.saveTask(req.body.email,req.body.name,req.body.tasklasttime,req.body.taskDegree,req.body.task).then(async()=>{
   await model.saveDegrees(teacherName,degreeOfTask)
    })
    res.end()
  })


  router.post('/gettask',bodyParser.urlencoded({extended:true}),(req,res)=>{
    model.getTask(req.body.teacher).then((teacher)=>{
        res.json({teacher:teacher})
        res.end();
    })
  })


  router.post('/showtask',bodyParser.urlencoded({extended:true}),(req,res)=>{
    model.getTeacher(req.body.teacher+ " ").then((t)=>{
      model.getStudentExam(req.body.student).then((s)=>{
        res.json({teacher:t,student:s})
      })
    })
  })


  router.post('/taskdegree', upload.single('tasks'),bodyParser.urlencoded({extended:true}),(req,res)=>{
    let props = JSON.parse(req.body.props);
    let stuName = req.body.name
    let x = req.body.x

    let location = req.file.originalname
    props[x].location = location
    model.saveStudentTask(stuName,props).then(()=>{
      res.end()
    })
  })

  router.post('/getexamanddegree',bodyParser.urlencoded({extended:true}),async(req,res)=>{
   await model.getexamanddegree(req.body.name).then(async(s)=>{
   await   model.getTeacher(req.body.teacher).then((t)=>{
        res.json({students:s,teacher:t})
      })
    })
  })
  module.exports = router