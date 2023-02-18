const model = require('../model/registration.model')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

router.post('/registration',bodyParser.urlencoded({extended:true}),(req,res)=>{
    let teacher = "مستر عمار ياسر";
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password

    model.studnetRegistration(teacher,name,email,password).then((value)=>{res.end(value)})
    
})


router.get('/getteacher',(req,res)=>{
    model.getTeacherName().then((teachers)=>{
        res.json({teachers:teachers})
    })
})

module.exports = router