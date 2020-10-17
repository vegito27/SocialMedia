const Validator=require('validator')
const isEmpty =require('./is-empty')


module.exports=function validateExperienceInput(data){

	let error={}

	data.school=!isEmpty(data.school)?data.school:'';
	data.degree=!isEmpty(data.degree)?data.degree:'';
	data.fieldofstudy=!isEmpty(data.fieldofstudy)?data.fieldofstudy:'';


	if(Validator.isEmpty(data.school)){
		error.school="school field must not be Empty"
	}

	if(Validator.isEmpty(data.degree)){
		error.degree="degree field is required"
	}


	if(Validator.isEmpty(data.fieldofstudy)){
		error.fieldofstudy="fieldofstudy field must not be Empty"
	}

	return { 
		error,
		isValid:isEmpty(error)

	}

}