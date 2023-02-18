const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret is some thing that every body need to do in his application < isnot it '
const model = require('../model/student.model')

router.post('/getstudent',async(req,res)=>{
    
    try{
        const data =  jwt.verify(req.header('Authorization'),JWT_SECRET)
   
        new Promise((resolve,reject)=>{
        model.getStudent(data.name.slice(0,data.name.length-1)).then((student)=>{
            model.getTeacher(data.name).then((teacher)=>{
                res.json({student:student,teacher:teacher})
                resolve()
            })
            
        })
       })
    }
    catch{
        console.log('err in jwt durning student login')
        res.end();
    }

    
})

router.post('/accept',bodyParser.urlencoded({extended:true}),(req,res)=>{
    model.accept(req.body.name,req.body.taskArr).then(()=>{
        res.end();
    })
})

router.post('/disAgree',bodyParser.urlencoded({extended:true}),(req,res)=>{
    model.disAgree(req.body.name).then(()=>{
        res.end();
    })
})

router.post('/studegree',bodyParser.urlencoded({extended:true}),(req,res)=>{
    model.studegree(req.body.stuName,req.body.degree).then(()=>{
        res.end();
    })
})

router.post('/studenthome',bodyParser.urlencoded({extended:true}),async(req,res)=>{
  await  model.getStudents(req.body.student).then(async(s)=>{
       await model.getTeacher(req.body.teacher).then((t)=>{
            res.json({student:s,teacher:t})
        })
    })
})
module.exports = router