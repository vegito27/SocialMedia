import {GET_ERRORS,SET_CURRENT_USER} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'


export const registerUser=(userData,history)=>dispatch=>{

	axios
	.post('users/register',userData)
	.then(response=>history.push('/login'))
	.catch(err=>

		dispatch({
			type:GET_ERRORS,
			payload:err.response.data

		})
	)}
	

export const setCurrentUser=(decoded) =>{

	return {
		type:SET_CURRENT_USER,
		payload:decoded
	}
}		

export const loginUser=userData=>dispatch=>{

	axios
	.post('users/login',userData)
	.then(res=>{

		const {token}=res.data;

		localStorage.setItem('jwtToken',token)

		setAuthToken(token)

		const decoded=jwt_decode(token)

		dispatch(setCurrentUser(decoded))

	})
	.catch(error=>

		dispatch({

			type:GET_ERRORS,
			payload:error.response.data

		})
	)
}

export const logOutUser=()=>dispatch=>{

	localStorage.removeItem('jwtToken')

	setAuthToken(false)

	dispatch(setCurrentUser({}))

}

  
















