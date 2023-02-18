const express = require('express')
const app = express()
const registration = require('./controllers/registration.router')
const student = require('./controllers/student.router')
const login = require('./controllers/login.router')
const lecture = require('./controllers/lecture.router')
const upload = require('./controllers/upload.router')
const exam = require('./controllers/exam.router')
const addTask = require('./controllers/addTask.router')
const recieveTasks = require('./controllers/recieveTasks.router')
const adminHome = require('./controllers/adminHome.router')
// const cors = require('cors')
const dotenv =  require('dotenv')
const path = require('path')
dotenv.config()

app.use(express.static(path.join(__dirname,'build')))
app.use(express.json())
// app.use(cors())


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})

app.use('/home',registration)
app.use('/home',lecture)
app.use('/home/upload',upload)
app.use('/home/login',login)
app.use('/home',student)
app.use('/home',exam)
app.use('/home',addTask)
app.use('/home',recieveTasks)
app.use('/home',adminHome)




app.listen(process.env.PORT || 5500,()=>{console.log('sever is running')})


