const express=require('express')

const router=express.Router()

router.get('/test',(request,response)=>response.json({msg:"posts work"}))

module.exports=router 