import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS,CLEAR_CURRENT_PROFILE } from './types'


export const setProfileLoading =()=>{

	return {
		type:PROFILE_LOADING 
	}
} 

export const getCurrentProfile=()=>dispatch=>{

	dispatch(setProfileLoading())

	axios
	.get('/profile/')
	.then(response=>
		dispatch({
			type:GET_PROFILE,
			payload:response.data
		})
	).catch(err=>
	dispatch({
			type:GET_ERRORS,
			payload:{}
		})

	)
}


export const clearCurrentProfile=()=>{

	return {
		type:CLEAR_CURRENT_PROFILE 
	}
} 