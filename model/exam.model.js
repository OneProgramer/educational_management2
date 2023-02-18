const dotenv =  require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const model = require('./registration.model')
const DB_URL = "mongodb+srv://amaribnyassersenpai2002:amar0540833293@educational-management.z3l3x.mongodb.net/educational-management?retryWrites=true&w=majority"



exports.saveExam = (teacher,bigData,answers,names,degree,time,lastTime)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
          return  model.Teacher.findOneAndUpdate({name:teacher},{$push:{exams:[bigData],answers:[answers],examsNames:names,degree:degree,time:time,dateLastTime:lastTime,examsCase:false}}).then(()=>{
                mongoose.disconnect();
                resolve()
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.getexams = (teacher)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return model.Teacher.findOne({name:teacher}).then((teacher)=>{
                mongoose.disconnect()
                resolve(teacher)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}


exports.editExam = (name,examsCase)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
          return  model.Teacher.findOneAndUpdate({name:name},{examsCase:examsCase},{new:true}).then((teacher)=>{
              mongoose.disconnect();
              resolve(teacher);
          }).catch((err)=>{
              mongoose.disconnect();
              reject(err);
          })
        })
    })
}

// exports.saveDegrees = (name,examDegree)=>{
//     return new Promise((resolve,reject)=>{
//         mongoose.connect(DB_URL).then(()=>{
//           return   model.Student.updateMany({teacher:name.substring(0, name.length - 1)},{$push:{degrees:examDegree}}).then(()=>{
//               mongoose.disconnect();
//               resolve();
//           }).catch((err)=>{
//               mongoose.disconnect();
//               reject(err);
//           })
//         })
//     })
// }

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


exports.timeStart = (name,time,examName)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
          return model.Student.findOneAndUpdate({name:name},{$push:{timeStart:{exam:examName,time:time}}}).then((s)=>{
              mongoose.disconnect();
              resolve(s);
          }).catch((err)=>{
              mongoose.disconnect();
              reject(err);
          })
        })
    })
}
