const Validator=require('validator')
const isEmpty =require('./is-empty')


const validatePostInput=require('../models/Post')


module.exports=function validatePostInput(data){

	let error={}

	data.text=!isEmpty(data.text)?data.text:'';


	if(Validator.isEmpty(data.text)){
		error.text="Text field must not be Empty"

		return { 
			error,
			isValid:isEmpty(error)
		}
	}

	if(!Validator.isLength(data.text,{min:10,max:300})){
		error.text="Post must be between 10 and 300 Character"
	}



	return { 
		error,
		isValid:isEmpty(error)

	}

} 
