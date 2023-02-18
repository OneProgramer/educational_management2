const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
router.get('/:id',(req,res)=>{

if( fs.existsSync(path.join(__dirname,'../','/lecture',req.params.id ))){
    res.sendFile(path.join(__dirname,'../','/lecture',req.params.id))
}else if( fs.existsSync(path.join(__dirname,'../','/tasks',req.params.id )))
{
    res.sendFile(path.join(__dirname,'../','/tasks',req.params.id))
}
else{
    res.end()
    console.log('file is not exist')
}
})


module.exports = router 