const dotenv =  require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const model = require('./registration.model')
const DB_URL = "mongodb+srv://amaribnyassersenpai2002:amar0540833293@educational-management.z3l3x.mongodb.net/educational-management?retryWrites=true&w=majority"


exports.saveTask=  (email,taskName,taskLastTime,taskDegree,task)=>{
    
    return new Promise((resolve,rejcet)=>{
        mongoose.connect(DB_URL).then(()=>{
            model.Teacher.findOneAndUpdate({email:email},{$push:{taskAdded:task,taskAddedName:taskName,taskLastTime:taskLastTime,taskDegree:+taskDegree}}).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                mongoose.disconnect()
                rejcet(err)
            })
        })
    })
}


exports.getTask = (name)=>{
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



exports.saveDegrees = (name,examDegree)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
          return  model.Student.updateMany({teacher:name.substring(0, name.length - 1)},{$push:{tasks:examDegree}}).then(()=>{
              mongoose.disconnect();
              resolve();
          }).catch((err)=>{
              mongoose.disconnect();
              reject(err);
          })
        })
    })
}


exports.getTeacher = (name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return model.Teacher.findOne({name:name}).then((teacher)=>{
                mongoose.disconnect()
                resolve(teacher)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.getStudentExam = (name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
          return  model.Student.findOne({name:name}).then((student)=>{
              mongoose.disconnect();
              resolve(student);
          }).catch((err)=>{
              mongoose.disconnect();
              reject(err);
          }) 
        })
    })
}


exports.saveStudentTask=  (name,props)=>{
    return new Promise((resolve,rejcet)=>{
        mongoose.connect(DB_URL).then(()=>{
            model.Student.findOneAndUpdate({name:name},{tasks:props}).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch((err)=>{
                mongoose.disconnect()
                rejcet(err)
            })
        })
    })
}


exports.getexamanddegree=  (name)=>{
    return new Promise((resolve,rejcet)=>{
        mongoose.connect(DB_URL).then(()=>{
         return   model.Student.findOne({name:name}).then((s)=>{
                mongoose.disconnect()
                resolve(s)
            }).catch((err)=>{
                mongoose.disconnect()
                rejcet(err)
            })
        })
    })
}