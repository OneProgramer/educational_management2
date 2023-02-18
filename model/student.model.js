const dotenv =  require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://amaribnyassersenpai2002:amar0540833293@educational-management.z3l3x.mongodb.net/educational-management?retryWrites=true&w=majority"

const registration = require('./registration.model')


exports.getStudent = (teacher)=>{
    return new Promise(async(resolve,reject)=>{
      await  mongoose.connect(DB_URL).then(()=>{
            return registration.Student.find({teacher:teacher}).then((student)=>{
                mongoose.disconnect()
                resolve(student)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.getStudents = (s)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return registration.Student.findOne({name:s}).then((student)=>{
                mongoose.disconnect()
                resolve(student)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}


exports.getTeacher = (teacher)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return registration.Teacher.findOne({name:teacher}).then((Teacher)=>{
                mongoose.disconnect()
                resolve(Teacher)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.accept = (name,taskArr)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
             registration.Student.findOneAndUpdate({name:name},{accept:true,tasks:taskArr}).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                reject(err)
            })
        })
    })
}

exports.disAgree = (name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
             registration.Student.findOneAndDelete({name:name}).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                reject(err)
            })
        })
    })
}

exports.studegree = (name,degree)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
             registration.Student.findOneAndUpdate({name:name},{$push:{degrees:degree}}).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                reject(err)
            })
        })
    })
}



