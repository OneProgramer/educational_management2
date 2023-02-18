const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret is some thing that every body need to do in his application < isnot it '
const registrationModel = require('../model/registration.model')
const loginModel = require('../model/login.model')




router.post('/',bodyParser.urlencoded({extended:true}),(req,res)=>{

    const email = req.body.email;
    const password = req.body.password;
    if(password === "rm21amar" && email === "amar@amar" ){
        registrationModel.checkTeacher(email,password).then((result)=>{
            if(result===true){
                loginModel.teacher(email).then((teacher)=>{
                    let token = jwt.sign({email:req.body.email,name:teacher.name},JWT_SECRET,{expiresIn:'24h'})
                    res.json({token:token,teacher:teacher,kind:'teacher'})
                })
                
            }else{
                res.status(200).json({err:'الايميل أو كلمة المرور غير صحيحة'})
            }
        })
    }else{
        registrationModel.checkStudent(email,password).then((data)=>{
            if(data === true){
                loginModel.student(email).then((student )=>{
                    if(student.accept){
                    let token = jwt.sign({email:req.body.email},JWT_SECRET,{expiresIn:'24h'})
                    res.json({token:token,student:student,kind:'student'})
                    }else{
                        res.json({student:"false"})
                    }
                })
            }else{
                res.status(200).json({err:'الايميل أو كلمة المرور غير صحيحة'})
            }
        })
    }
})

module.exports = router