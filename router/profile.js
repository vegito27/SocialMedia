const express=require('express')
const router=express.Router()
const mongoose =require('mongoose')
const passport=require('passport')


const Profile=require('../models/Profile')

const User=require('../models/User')

router.get('/',passport.authenticate('jwt',{session:false}),(request,response)=>{

	const error={ }

	Profile.findOne({ user:request.user.id })
	.then(profile=>{

		if(!profile){
			error.noprofile='There is no profile for this user'
			return response.status(404).json(error)
		}

		response.json(profile)

	}).catch(err=>response.status(404).json(err))

})





module.exports=router 