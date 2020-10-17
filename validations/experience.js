const Validator=require('validator')
const isEmpty =require('./is-empty')


module.exports=function validateExperienceInput(data){

	let error={}

	data.title=!isEmpty(data.title)?data.title:'';
	data.company=!isEmpty(data.company)?data.company:'';
	data.from=!isEmpty(data.from)?data.from:'';


	if(Validator.isEmpty(data.title)){
		error.title="Title field must not be Empty"
	}

	if(Validator.isEmpty(data.from)){
		error.from="From field is required"
	}


	if(Validator.isEmpty(data.company)){
		error.company="Company field must not be Empty"
	}

	return { 
		error,
		isValid:isEmpty(error)

	}

}