import React from 'react';
import Register from './Register'
import {Link} from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loginUser} from '../../actions/authActions'
import TextFieldGroup from '../../common/TextFieldGroup'

class Login extends React.Component {
	
	constructor(props) {
		super(props);

	this.state={
				email:'',
				password:'',
				error:{}
				
			}
			this.onChange=this.onChange.bind(this)
			this.onSubmit=this.onSubmit.bind(this)

	}

	componentWillReceiveProps(nextProps){

		if(nextProps.auth.isAuthenticated){
			this.props.history.push('/dashboard')
		}

		if(nextProps.error){
			this.setState({error:nextProps.error})
		}
	}

	onChange(e){

		this.setState({[e.target.name]:e.target.value})

	}

	onSubmit(e){
		 e.preventDefault();

		 const newUser={
		 	email:this.state.email,
		 	password:this.state.password
		 }

		this.props.loginUser(newUser)
	}

	render() {

		const {error}=this.state

		return (
			<section className="container col-md-8 m-auto">
			     
			      <h1 className="large text-primary">Login</h1>
			      
			      <p className="lead"><i className="fas fa-user mr-3"></i> Enter Your Credentials</p>
			      
			      <form className="form" noValidate onSubmit={this.onSubmit}>

				     <TextFieldGroup placeholder="Email" name="email" type="email" value={this.state.email} onChange={this.onChange} error={error.email } />

			          <small className="form-text"> This site uses Gravatar so if you want a profile image, use a Gravatar email </small>
			        
			        <TextFieldGroup placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.onChange} error={error.password } />

			        <input type="submit" className="btn btn-info btn-block mt-4" value="Login" />

			      </form>

			      <p className="my-1">
			        Already have an account? <Link to="/register" >Sign Up</Link>
			      </p>
		    </section>
		);
	}
}

Login.propTypes={
	loginUser:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired,
	error:PropTypes.object.isRequired
}


const mapStateToProps=(state)=>({
	auth:state.auth,
	error:state.error
})


export default connect(mapStateToProps ,{loginUser})(Login)









