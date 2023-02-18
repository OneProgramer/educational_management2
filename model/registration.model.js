const dotenv =  require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://amaribnyassersenpai2002:amar0540833293@educational-management.z3l3x.mongodb.net/educational-management?retryWrites=true&w=majority"

// const bcrypt = require('bcrypt') 


// create studnet account      
let studentSchema =  mongoose.Schema({
    teacher:String,
    name:String,
    email:String,
    passowrd:String,
    lessons:[],
    call:Boolean,
    tasks:[],
    degrees:[],
    accept:Boolean,
    timeStart:[],
})

 exports.Student = mongoose.model('student',studentSchema)
 let Student = mongoose.model('student',studentSchema)

exports.studnetRegistration = (teacher,name,email,passowrd)=>{
    
    return new Promise((resolve,reject)=>{
         mongoose.connect(DB_URL).then(()=>{
            return Student.findOne({email:email}).then((stu)=>{
                if(stu){
                    console.log('user is already exist')
                }else{
                    return passowrd
                }
            }).then(async(passowrd)=>{
              if(passowrd){
                await Student.create({teacher:teacher,name:name,email:email,passowrd:passowrd,accept:false})
              }else{
                  return false
              }
            }).then((value)=>{
                mongoose.disconnect()
                resolve(value)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}




// create teacher account
 teacherSchema = mongoose.Schema({
    teacher:String,
    name:String,
    email:String,
    passowrd:String,
    bestStudents:[],
    lessons:[],
    fileName:[],
    exams:[],
    answers:[],
    examsNames:[],
    time:[],
    dateLastTime:[],
    degree:[],
    examsCase:[],
    taskAdded:[],
    taskAddedName:[],
    taskLastTime:[],
    taskDegree:[]
})

exports.Teacher = mongoose.model('teacher',teacherSchema)
let Teacher = mongoose.model('teacher',teacherSchema)

//     exports.teacherRegistration = (name,email,passowrd)=>{
//     return new Promise((resolve,reject)=>{
//         mongoose.connect(DB_URL).then(()=>{
//             return Teacher.findOne({email:email}).then((teach)=>{
//                 if(teach){
//                console.log('user is already exist')
//                 }else{ 
//                    return bcrypt.hash(passowrd,10)
//                 }
//             }).then(async(hashedPassword)=>{
//                 if(hashedPassword){
//                     await Teacher.create({name:name,email:email,passowrd:hashedPassword})
//                   }
//             }).then(()=>{
//                 mongoose.disconnect()
//                 resolve()
//             }).catch((err)=>{
//                 mongoose.disconnect()
//                 reject(err)
//             })
//         })
//     })
// }


exports.checkStudent = (email,password)=>{
    return new Promise((resolve,reject)=>{
         mongoose.connect(DB_URL).then(()=>{
             return Student.findOne({email:email,password:password}).then((stu)=>{
                 if(!stu){
                    resolve(false)
                 }else if(stu){
                        mongoose.disconnect()
                        resolve(true)
                }
             })
         }).catch((err)=>{
             mongoose.disconnect()
             reject(err)
         })
    })
}



exports.checkTeacher = (email,password)=>{
    return new Promise((resolve,reject)=>{
         mongoose.connect(DB_URL).then(()=>{
             return Teacher.findOne({email:email,password:password}).then((teach)=>{
                 if(!teach){
                    resolve(false)
                 }else if(teach){
                        mongoose.disconnect()
                        resolve(true)
                }
             })
         }).catch((err)=>{
             mongoose.disconnect()
             reject(err)
         })
    })
}

exports.getTeacherName = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Teacher.find().then((t)=>{
                if(t){
                    mongoose.disconnect()
                    let teachersName = t.map((t)=>{return t.name})
                    resolve(teachersName)
                }else{
                    mongoose.disconnect()
                    resolve()
                }
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}