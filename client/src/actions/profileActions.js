import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS,CLEAR_CURRENT_PROFILE,SET_CURRENT_USER } from './types'


export const setProfileLoading =()=>{

	return {
		type:PROFILE_LOADING 
	}
} 

//GET PROFILE

export const getCurrentProfile=()=>dispatch=>{

	dispatch(setProfileLoading())

	axios
	.get('/profile')
	.then(response=>
		dispatch({
			type:GET_PROFILE,
			payload:response.data
		})
	).catch(err=>
	
		dispatch({
				type:GET_PROFILE,
				payload:{}
			})

	)
}

export const createProfile=(profileData,history)=>dispatch=>{

	axios
	.post('/profile',profileData)
	.then(res=>history.push('/dashboard'))
	.catch(err=>

		dispatch({
			type:GET_ERRORS,
			payload:err.response.data
		})

	)
}


export const addExperience=(expData,history)=>dispatch=>{

	axios
	.post('/profile/experience',expData)
	.then(res=>history.push('/dashboard'))
	.catch(err=>{
		dispatch({
			type:GET_ERRORS,
			payload:err.response.data
		})
	})
}


export const addEducation=(eduData,history)=>dispatch=>{

	axios
	.post('/profile/education',eduData)
	.then(res=>history.push('/dashboard'))
	.catch(err=>{
		dispatch({
			type:GET_ERRORS,
			payload:err.response.data
		})
	})


}



export const clearCurrentProfile=()=>{

	return {
		type:CLEAR_CURRENT_PROFILE 
	}
} 


export const deleteAccount=()=>dispatch=>{


	if(window.confirm('Are you sure? this can NOT be undone!')){

		axios
		.delete('/profile')
		.then(res=>

			dispatch({
				type:SET_CURRENT_USER,
				payload:{}
			})


		).catch(err=>

		dispatch({

			type:GET_ERRORS,
			payload:err.response.data

		})
	)}
}







