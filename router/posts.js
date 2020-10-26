const express=require('express')

const router=express.Router()

const mongoose=require('mongoose')

const passport=require('passport')

const Post =require('../models/Post')
    
const validatePostInput=require('../validations/post')

const Profile=require('../models/Profile')


router.get('/',(request,response)=>{
	Post.find()
	.sort({date:-1})
	.then(post=>response.json(post))
	.catch(err=>response.status(404).json({nopostfound:"No post found"}))
})

router.get('/:id',(request,response)=>{
	Post.findById(request.params.id)
	.then(post=>response.json(post))
	.catch(err=>response.status(404).json({nopostfound:"No post found"}))
 })


router.post('/',passport.authenticate('jwt',{session:false}),(request,response)=>{
	const {error,isValid}=validatePostInput(request.body)	
	if(!isValid){
		return response.status(400).json(error)
	}
	const newPost=new Post({
		text:request.body.text,
		name:request.body.name,
		avatar:request.body.avatar,
		user:request.user.id
	})
	newPost.save().then(post=>response.json(post)).catch(err=>response.status(404).json(err)) 
})


router.delete('/:id',passport.authenticate('jwt',{session:false}),(request,response)=>{
	Profile.findOne({user:request.user.id})
	.then(profile=>{
		Post.findById(request.params.id)
		.then(post=>{
			if(post.user.toString()!==request.user.id){
				return response.status(401).json({notauthorized :'User not authorized'}) 
			}
			post.remove().then(()=> response.json({success:true}))
		})
		.catch(err=> response.status(404).json({postnotFound:'no Post found with that Id'}))
	})
}) 



router.post('/like/:id',passport.authenticate('jwt',{session:false}),(request,response)=>{

	Profile.findOne({user:request.user.id})
	.then(profile=>{
		Post.findById(request.params.id)
		.then(post=>{
			if(post.likes.filter(like=>like.user.toString()=== request.user.id).length>0 ){

				return response.status(400).json({alreadyliked :'User already liked this post'}) 
			}

			post.likes.unshift({ user:request.user.id })

			post.save().then(post=>response.json(post))
			
		})
		.catch(err=> response.status(404).json({postnotFound:'no Post found with that Id'}))
	})
})



router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(request,response)=>{

	Profile.findOne({user:request.user.id})
	.then(profile=>{
		Post.findById(request.params.id)
		.then(post=>{
			if(post.likes.filter(like=>like.user.toString()=== request.user.id).length === 0 ){

				return response.status(400).json({notliked  :'You have not yet liked this post'}) 
			}

			const removeIndex=post.likes.map(item=>item.user.toString()).indexOf(request.user.id)

			post.likes.splice(removeIndex,1)


			post.save().then(post=>response.json(post))
	
			
		})
		.catch(err=> response.status(404).json({postnotFound:'no Post found with that Id'}))
	})
})


router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(request,response)=>{

	const {error,isValid}=validatePostInput(request.body)	
	if(!isValid){
		return response.status(400).json(error)
	}

	Post.findById(request.params.id)
	.then(post=>{

		const newComment={
			text:request.body.text,
			name:request.body.name,
			avatar:request.body.avatar,
			user:request.user.id
		}

		post.comments.unshift(newComment)

		post.save().then(post=>{
			response.json(post)
		})
		.catch(err=>response.status(404).json({postnotFound:"No post found"}))

	}) 
})


router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),(request,response)=>{

	
	Post.findById(request.params.id)
	.then(post=>{

		if(post.comments.filter(comment=>comment._id.toString()===request.params.comment_id).length === 0 ){

			return response.status(404).json({commentnotexists: 'Comment does not exists'}) 

		}

		const removeIndex=post.comments.map(item=>item._id.toString()).indexOf(request.params.comment_id)

		post.comments.splice(removeIndex,1);

		post.save().then(post=>response.json(post))
		
	}).catch(err=>response.status(404).json({postnotFound:"No post found"}))

})

module.exports=router 
