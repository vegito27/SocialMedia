const express=require('express')

const router=express.Router()

const gravatar=require('gravatar')

const bcrypt=require('bcryptjs') 

const User=require('../models/User')

const jwt=require('jsonwebtoken')

const passport=require('passport')

const secretOrKeys='secret'

const validateRegisterInput=require('../validations/register')

const validateLoginInput=require('../validations/login')


router.get('/test',(request,response)=>response.json({msg:"Users work"}))


router.post('/register',(request,response)=>{


	const {error,isValid}=validateRegisterInput(request.body);

	
	if(!isValid){
		return response.status(400).json(error) 
	}


	User.findOne({email:request.body.email}).then(user=>{

		if(user){
			error.email="Email already exists"
			return response.status(400).json(error)
		
		}else{

			const avatar=gravatar.url(request.body.email,{
				s:'200',
				r:'pg',
				d:'mm'
			}) 

				const newUser=new User({
					name:request.body.name,
					email:request.body.email,
					avatar,
					password:request.body.password,
					password2:request.body.password2
					
				})

				bcrypt.genSalt(10,(err,salt)=>{

					bcrypt.hash(newUser.password,salt,(err,hash)=>{

						if(err) throw err

							newUser.password=hash
						
						newUser
							.save()
							.then(user=>response.json(user))
							.catch(err=>console.log(err))	
					})
				})
			}
		})

	})


router.post('/login',(request,response)=>{


	const {error,isValid}=validateLoginInput(request.body);

	
	if(!isValid){
		return response.status(400).json(error) 
	}

	const email=request.body.email;
	const password=request.body.password

	User.findOne({email}).then(user=>{

		console.log(user)

		if(!user){
			error.email="Invalid user"
			return response.status(404).json(error)
  		}

  		bcrypt.compare(password,user.password)
	  		  .then(isMatch=>{

	  		  	if(isMatch){

	  		  		const payload={id:user.id,name:user.name,avatar:user.avatar}
	  		  	

	  		  	jwt.sign(payload,secretOrKeys,{expiresIn:86400},(err,token)=>{

	  		  		response.json({
	  		  			Success:true,
	  		  			token:'Bearer '+token

	  		  		})
	  		  	})

			}
			else{

				error.password="Password incorrect"

	  		  	return response.status(400).json(error)

		  		  	}

		  		})
			}) 
	
		})




router.get('/current',passport.authenticate('jwt',{session:false}),(request,response)=>{

			response.json(request.user)


		})



module.exports=router 




























