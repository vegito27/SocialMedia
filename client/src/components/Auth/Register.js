import React from 'react';
import Login from './Login'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Register extends React.Component {
	
	constructor(props) {
		super(props);

		this.sate={
				name:'',
				email:'',
				password:'',
				password2:'',
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
		 	name:this.state.name,
		 	email:this.state.email,
		 	password:this.state.password,
		 	password2:this.state.password2

		 }

		 axios.post('/users/register',newUser)
		 .then(res=>console.log(res))
		 .catch(err=>console.log(err.response.data))

		 console.log(newUser)
	}

	render() {
		return (
			
			<section className="container col-md-8 m-auto">
			     
			      <h1 className="large text-primary">Sign Up</h1>
			      
			      <p className="lead"><i className="fas fa-user mr-3"></i> Create Your Account</p>
			      
			      <form className="form" onSubmit={this.onSubmit}>
			        
			        <div className="form-group">
			          <input type="text" 
			          placeholder="Name" 
			          className="form-control form-control-lg" 
			          name="name"  
			          onChange={this.onChange.bind(this)} 
			          required 
			          />
			        </div>
			        
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
			        
			        <div className="form-group">
			          <input
			            type="password"
			            placeholder="Confirm Password"
			            name="password2"
			            minLength="6"
			            className="form-control form-control-lg"
			            
			            onChange={this.onChange}
			          />
			        </div>
			       
			        <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />

			      </form>

			      <p className="my-1">
			        Already have an account? <Link to="/login" > Login </Link>
			      </p>
		    </section>
  
		);
	}
}

export default Register
