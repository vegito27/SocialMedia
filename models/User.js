const mongoose =require('mongoose')

const schema=mongoose.Schema

const UserSchema={

	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	avatar:{
		type:String
		
	},
	date:{
		type:String,
		default:Date.now()
	}

}

module.exports=User=mongoose.model('DB',UserSchema)