const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const model = require('../model/recieveTasks.model')

router.post('/recievetasks',bodyParser.urlencoded({extended:true}),(req,res)=>{
    model.getStudents(req.body.name).then((students)=>{
        res.json({students:students})
    })
})


router.post('/recievealltasks',bodyParser.urlencoded({extended:true}),(req,res)=>{
    model.getAllTasks(req.body.name).then((teacher)=>{
        res.json({teacher:teacher})
    })
})


router.post('/updatetask',bodyParser.urlencoded({extended:true}),(req,res)=>{
    model.updatetask(req.body.student,req.body.task).then(()=>{
        res.end()
    })
})

module.exports = router 