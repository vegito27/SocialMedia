const express=require('express')
const router=express.Router()
const mongoose =require('mongoose')
const passport=require('passport')
const validateLoginInput=require('../validations/profile')
const Profile=require('../models/Profile')
const User=require('../models/User')
const validateExperienceInput=require('../validations/experience')
const validateEducationInput=require('../validations/education')


router.get('/',passport.authenticate('jwt',{session:false}),(request,response)=>{

	const error={}

	Profile.findOne({ user:request.user.id })
	.then(profile=>{

		if(!profile){
			error.noprofile='There is no profile for this user'
			return response.status(404).json(error)
		}

		response.json(profile)

	}).catch(err=>response.status(404).json(err))

})


router.delete('/',passport.authenticate('jwt',{session:false}) , async (req, res) => {
  try {
   
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/handle/:handle',(request,response)=>{

	const error={}
	console.log(request.params.handle)

	Profile.findOne({handle:request.params.handle})
	.populate('user',['name','avatar'])
	.then(profile=>{

		if(!profile){
			error.noprofile="There is no profile for this user"
			response.status(404).json(error)
		}

		response.json(profile)
	})
	.catch(err=>response.status(404).json(err)) 

})


router.get('/user/:user_id', async (request,response)=>{

	const error={}

	await Profile.findOne({user:request.params.user_id })
	.populate('user',['name','avatar'])
	.then(profile=>{

		if(!profile){
			error.noprofile="There is no profile for this user"
			response.status(404).json(error)
		}

		response.status(200).json(profile)
	})
	.catch(err=>response.status().json(err)) 
})

router.get('/all',(request,response)=>{

	Profile.find()
	.populate('user',['name','avatar'])
	.then(profiles=>{
		if(!profiles){

			error.profile="There is no profile for this user"

			return response.status(404).json()
		}

		response.json(profiles)

	}).catch(errr=>response.status(404).json(errr))

})


router.post('/experience',passport.authenticate('jwt',{session:false}),(request,response)=>{

	const {error,isValid}=validateExperienceInput(request.body)

	if(!isValid){

		return response.status(400).json(error)
	}

	Profile
	.findOne({user:request.user.id})
	.then(profile=>{

		const newExp={
			title:request.body.title,
			company:request.body.company,
			from:request.body.from,
			to:request.body.to,
			current:request.body.current,
			description:request.body.description
		}

		profile.experience.unshift(newExp)

		profile
		.save()
		.then(profile=>{response.json(profile)}) 
		}).catch(err=>response.status(404).json(err))

})


router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(request,response)=>{

	Profile.findOne({user:request.user.id})
		.then(profile=>{

			const removeIndex=profile.experience
			.map(item=>item.id)
			.indexOf(request.params.exp_id)

			profile.experience.splice(removeIndex,1)

			profile.save().then(profile=>{
				response.json(profile)
			}).catch(err=>response.status(404).json(err)) 
		})
		.catch(err=>response.status(404).json(err))


})


router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),(request,response)=>{


	Profile.findOne({user:request.user.id}).then(profile=>{

			const removeIndex=profile.education.map(item=>item.id).indexOf(request.params.edu_id)

			profile.education.splice(removeIndex,1)

			profile.save()
			.then(profile=>{
				response.json(profile)
			}) 
		})
		.catch(err=>response.status(404).json(err))

})


router.post('/education',passport.authenticate('jwt',{session:false}),(request,response)=>{

	const {error,isValid}=validateEducationInput(request.body)

	if(!isValid){

		return response.status(400).json(error)
	}

	Profile.findOne({user:request.user.id})
		.then(profile=>{

			const newExp={

				school:request.body.school,
				degree:request.body.degree,
				from:request.body.from,
				to:request.body.to,
				fieldofstudy:request.body.fieldofstudy,
				description:request.body.description

			}

			profile.education.unshift(newExp)

			profile.save().then(profile=>{
				response.json(profile)
			}) 
		}).catch(err=>response.status(404).json(err))
})



router.post('/',passport.authenticate('jwt',{session:false}),(request,response)=>{

	const profileFields={};


	const {error,isValid}=validateLoginInput(request.body)

	if(!isValid){

		return response.status(400).json(error)
	}

	profileFields.user=request.user.id

	if(request.body.handle) profileFields.handle=request.body.handle
	if(request.body.comapny) profileFields.comapny=request.body.company
	if(request.body.website) profileFields.website=request.body.website
	if(request.body.location) profileFields.location=request.body.location
	if(request.body.status) profileFields.status=request.body.status
	if(request.body.bio) profileFields.bio=request.body.bio
	if(request.body.githubusername) profileFields.githubusername=request.body.githubusername

	if(typeof request.body.skills !=='undefined'){
		
		profileFields.skills=request.body.skills.split(',')

	}	
	profileFields.social ={}

	if(request.body.youtube) profileFields.social.youtube=request.body.youtube
	if(request.body.twitter) profileFields.social.twitter=request.body.twitter
	if(request.body.linkedin) profileFields.social.linkedin=request.body.linkedin
	if(request.body.instagram) profileFields.social.instagram=request.body.instagram
	if(request.body.facebook) profileFields.social.facebook=request.body.facebook


	Profile.findOne({user:request.user.id})
	.then(profile=>{

		console.log(profile)

		if(profile){

			Profile.findOneAndUpdate(
				{user:request.user.id},
				{$set:profileFields},
				{new:true}
			).then(profile=>response.json(profile));

		}else{

			Profile.findOne({handle: profileFields.handle }).then(profile=>{

				if(profile){
					error.handle='Thats handle already exists'
					response.status(400).json(error)
				}

				new Profile(profileFields).save().then(profile=>response.json(profile)) 

			})
		}
	}) 	


})

module.exports=router 