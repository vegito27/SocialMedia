import React from 'react';
import Register from './Register'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Login extends React.Component {
	
	constructor(props) {
		super(props);

	this.sate={
				email:'',
				password:'',
				error:{}
				
			}
			this.onChange=this.onChange.bind(this)
			this.onSubmit=this.onSubmit.bind(this)

	}

	onChange(e){

		this.setState({[e.target.name]:e.target.value})

	}

	onSubmit(e){
		 e.preventDefault();

		 const newUser={
		 	email:this.state.email,
		 	password:this.state.password,
		 	

		 }

		 console.log(newUser)
	}

	render() {
		return (
			<section className="container col-md-8 m-auto">
			     
			      <h1 className="large text-primary">Login</h1>
			      
			      <p className="lead"><i className="fas fa-user mr-3"></i> Enter Your Credentials</p>
			      
			      <form className="form" onSubmit={this.onSubmit}>
			        
			        
			        
			        <div className="form-group">
			          <input type="email" 
			          placeholder="Email Address" 
			          className="form-control form-control-lg" 
			          name="email" onChange={this.onChange} 
			           
			          />

			          <small className="form-text"> This site uses Gravatar so if you want a profile image, use a Gravatar email </small>

			        </div>
			        
			        <div className="form-group">
			          <input
			            type="password"
			            placeholder="Password"
			            name="password"
			            minLength="6"
			            className="form-control form-control-lg"
			            
			            onChange={this.onChange}
			          />
			        </div>
			        
			        
			       
			        <input type="submit" className="btn btn-info btn-block mt-4" value="Login" />

			      </form>

			      <p className="my-1">
			        Already have an account? <Link to="/register" >Sign Up</Link>
			      </p>
		    </section>
		);
	}
}

export default Login
