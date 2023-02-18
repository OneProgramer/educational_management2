const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../model/adminHome.model')

router.post('/adminhome',bodyParser.urlencoded({extended:true}),async(req,res)=>{
    let name = req.body.name;
    new Promise((resolve,reject)=>{
        let  stuReq  = []
        model.getStudents(name).then((s)=>{
            let first = {name:'',degree:0,i:null}
            let second = {name:'',degree:0,i:null}
            let third = {name:'',degree:0 }
    
            for(let i=0;i<s.length;i++){
                if(s[i].accept == true){
                    let degree = 0;
                for(let j=0;j<s[i].tasks.length;j++){
                    degree += s[i].tasks[j].stuDegree; 
                }
                
                for(let j=0;j<s[i].degrees.length;j++){
                    degree += s[i].degrees[j].degree; 
                }

          
                    if(degree >= first.degree){
                        first.name = s[i].name
                        first.degree = degree
                        first.i = i;
                    }

                }
            }

            for(let i=0;i<s.length;i++){
                if(s[i].accept == true){
                    let degree = 0;
                for(let j=0;j<s[i].tasks.length;j++){
                    degree += s[i].tasks[j].stuDegree; 
                }
                
                for(let j=0;j<s[i].degrees.length;j++){
                    degree += s[i].degrees[j].degree; 
                }

          
                    if(degree >= second.degree && degree <= first.degree && i!== first.i){
                        second.name = s[i].name
                        second.degree = degree
                        second.i == i
                    }

                    if(second.name == first.name ){
                        second.name = ''
                        second.degree = 0
                    }

                   
                }
            }

            for(let i=0;i<s.length;i++){
                if(s[i].accept == true){
                    let degree = 0;
                for(let j=0;j<s[i].tasks.length;j++){
                    degree += s[i].tasks[j].stuDegree; 
                }
                
                for(let j=0;j<s[i].degrees.length;j++){
                    degree += s[i].degrees[j].degree; 
                }

          
                    if(degree >= third.degree && degree <= first.degree  && degree <= second.degree && i!== first.i && i!== second.i){
                        third.name = s[i].name
                        third.degree = degree
                    }

                    if(third.name == first.name || third.name == second.name ){
                        third.name = ''
                        third.degree = 0
                    }

                  

                }
            }

         


            for(let i=0;i<s.length;i++){
                if(s[i].accept == false){
                    stuReq.push(s[i].name)
                }
            }
            
             return([first,second ,third,stuReq])
        }).then(async(best)=>{
           await model.getTeacher(name).then((teacher)=>{
                res.json({teacher:teacher,best:best})
            })
            resolve()
        })

    })
       
     }) 












  
module.exports = router