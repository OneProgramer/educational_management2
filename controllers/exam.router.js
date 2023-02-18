const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../model/exam.model');



router.post('/saveexam',bodyParser.urlencoded({extended:true}),(req,res)=>{
    const teacher = req.body.teacher;
    const bigData = req.body.bigData
    const answers = req.body.answers;
    const exmaName = req.body.exmaName;
    const degree = req.body.degree;
    const time = req.body.time;
    const dateLastTime = req.body.dateLastTime;

    model.saveExam(teacher,bigData,answers,exmaName,degree,time,dateLastTime).then(()=>{
        res.end()
    })
})


router.post('/getexams',bodyParser.urlencoded({extended:true}),async(req,res)=>{
   await model.getexams(req.body.teacher).then(async(teacher)=>{
    await  model.getStudentExam(req.body.name).then((student)=>{
        if(teacher){
            res.status(200).json({teacher:teacher,studentExam:student})
            }else{
                res.json({teacher:null,studentExam:student})
            }
      })
    })
})

router.post('/examscase',bodyParser.urlencoded({extended:true}),(req,res)=>{
    model.editExam(req.body.name,req.body.examsCase).then((teacher)=>{
        if(teacher){
            res.json({teacher:teacher});  
        }else{
            res.json({teacher:null})
        }
    })
})


router.post('/savedgrees',bodyParser.urlencoded({extended:true}),(req,res)=>{  
    model.saveDegrees(req.body.name,req.body.exmaName).then(()=>{
        res.end()
    })
})


router.post('/timestart',bodyParser.urlencoded({extended:true}),(req,res)=>{
  
    model.timeStart(req.body.name,req.body.time,req.body.examName).then(()=>{
        res.end()
    })
})

module.exports = router