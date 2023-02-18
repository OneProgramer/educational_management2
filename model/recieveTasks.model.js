const dotenv =  require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://amaribnyassersenpai2002:amar0540833293@educational-management.z3l3x.mongodb.net/educational-management?retryWrites=true&w=majority"

const registration = require('./registration.model')


exports.getStudents = (name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return registration.Student.find({teacher:name.substring(0, name.length - 1)}).then((students)=>{
                mongoose.disconnect()
                resolve(students)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.getAllTasks = (name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return registration.Teacher.findOne({name:name}).then((teacher)=>{
                mongoose.disconnect()
                resolve(teacher)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}


exports.updatetask = (name,tasks)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            registration.Student.findOneAndUpdate({name:name},{tasks:tasks}).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}