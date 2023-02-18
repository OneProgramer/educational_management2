const dotenv =  require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const model = require('./registration.model')
const DB_URL = "mongodb+srv://amaribnyassersenpai2002:amar0540833293@educational-management.z3l3x.mongodb.net/educational-management?retryWrites=true&w=majority"


  
exports.saveLecture =  (email,link,fileName)=>{

    return new Promise((resolve,rejcet)=>{
        mongoose.connect(DB_URL).then(()=>{
            model.Teacher.findOneAndUpdate({email:email},{$push:{lessons:link,fileName:fileName}}).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                mongoose.disconnect()
                rejcet(err)
            })
        })
    })
}


exports.getLecture = (name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
           return model.Teacher.findOne({name:name}).then((teacher)=>{
                mongoose.disconnect()
                if(teacher){
                resolve(teacher)
                }else{
                resolve()
                }
            }).catch((err)=>{
                reject(err)
            })
        })
    })
}


