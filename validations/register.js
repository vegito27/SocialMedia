const Validator=require('validator')
const isEmpty =require('./is-empty')


module.exports=function validateRegisterInput(data){

	let error={}

	data.name=!isEmpty(data.name)?data.name:'';
	data.email=!isEmpty(data.email)?data.email:'';
	data.password=!isEmpty(data.password)?data.password:'';
	data.password2=!isEmpty(data.password2)?data.password2:'';


	if(!Validator.isLength(data.name,{min:2,max:30})){
		error.name='Name must be between 2 and 30 characters'
	}

	if(Validator.isEmpty(data.name)){
		error.name="Name field must not be Empty"
	}

	if(Validator.isEmpty(data.email)){
		error.email="Email field must not be Empty"
	}

	if(!Validator.isEmail(data.email)){
		error.email="Email is invalid"
	}

	if(!Validator.isLength(data.password,{min:6,max:30})){
		error.password="Password length must be atleast 6 characters"
	}

	if(Validator.isEmpty(data.password)){
		error.password="Password field must not be Empty"
	}

	if(Validator.isEmpty(data.password2)){
		error.password2="Confirm Password field must not be Empty"
	}

	if(!Validator.equals(data.password,data.password2)){
		error.password2="Password must match"
	}

	return { 
		error,
		isValid:isEmpty(error)

	}

}