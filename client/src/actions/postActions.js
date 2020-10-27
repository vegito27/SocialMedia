import axios from 'axios'

import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, GET_POST, DELETE_POST,CLEAR_ERRORS } from './types'


export const clearErrors=()=>{

	return {
		type:CLEAR_ERRORS
	}
}

export const setPostLoading=()=>{

	return {
		type:POST_LOADING
	}
}


export const getPosts=()=>dispatch=>{

	dispatch(setPostLoading())

	axios
	.get('/posts')
	.then(res=>
		dispatch({
			type:GET_POSTS,
			payload:res.data
		})
	)
	.catch(err=>

		dispatch({
			type:GET_POSTS,
			payload:null 
		})
	)
}


export const getPost=(id)=>dispatch=>{

	dispatch(setPostLoading())

	axios
	.get(`/posts/${id}`)
	.then(res=>
		dispatch({
			type:GET_POST,
			payload:res.data
		})
	)
	.catch(err=>

		dispatch({
			type:GET_POST,
			payload:null 
		})
	)
}


export const addPost=postData=>dispatch=>{

	dispatch(clearErrors())
	axios
	.post('/posts',postData)
	.then(res=>
		dispatch({
			type:ADD_POST,
			payload:res.data
		})
	)
	.catch(err=>

		dispatch({
			type:GET_ERRORS,
			payload:err.response.data 
		})
	)
}


export const deletePost=(id)=>dispatch=>{

	dispatch(setPostLoading())

	axios
	.delete(`/posts/${id}`)
	.then(res=>
		dispatch({
			type:DELETE_POST,
			payload:id
		})
	)
	.catch(err=>

		dispatch({
			type:GET_POSTS,
			payload:null 
		})
	)
}


export const addComment=(postId,commentData )=>dispatch=>{

	dispatch(clearErrors())

	axios
	.post(`/posts/comment/${postId}`,commentData)
	.then(res=>
		dispatch({
			type:GET_POST,
			payload:res.data
		})
	)
	.catch(err=>

		dispatch({
			type:GET_ERRORS,
			payload:err.response.data 
		})
	)
}


export const deleteComment=(postId,commentId)=>dispatch=>{

	axios
	.delete(`/posts/comment/${postId}/${commentId}`)
	.then(res=>
		dispatch({
			type:GET_POST,
			payload:res.data
		})
	)
	.catch(err=>

		dispatch({
			type:GET_ERRORS,
			payload:err.response.data 
		})
	)
}


export const addLike=id=>dispatch=>{

	dispatch(setPostLoading())

	axios
	.post(`/posts/like/${id}`)
	.then(res=>dispatch(getPosts()))
	.catch(err=>

		dispatch({
			type:GET_POSTS,
			payload:null 
		})
	)
}

export const removeLike=id=>dispatch=>{

	dispatch(setPostLoading())

	axios
	.post(`/posts/unlike/${id}`)
	.then(res=>dispatch(getPosts() ))
	.catch(err=>

		dispatch({
			type:GET_POSTS,
			payload:null 
		})
	)
}





