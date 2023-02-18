const dotenv =  require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://amaribnyassersenpai2002:amar0540833293@educational-management.z3l3x.mongodb.net/educational-management?retryWrites=true&w=majority"

const registration = require('./registration.model')




exports.teacher = (email)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return registration.Teacher.findOne({email:email}).then((teacher)=>{
                mongoose.disconnect()
                resolve(teacher)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}



exports.student = (email)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
           return registration.Student.findOne({email:email}).then((student)=>{
                mongoose.disconnect()
                resolve(student)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}
