const express=require('express')

const router=express.Router()

router.get('/test',(request,response)=>response.json({msg:"Users work"}))

module.exports=router 