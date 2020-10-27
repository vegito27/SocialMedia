import React from 'react';
import Login from './Login'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {registerUser} from '../../actions/authActions'
import { withRouter } from 'react-router-dom'
import TextFieldGroup from '../../common/TextFieldGroup'

class Register extends React.Component {
	
	constructor(props) {
		super(props);

		this.state={
				name:'',
				email:'',
				password:'',
				password2:'',
				error:{}
		}
		this.onChange=this.onChange.bind(this)
		this.onSubmit=this.onSubmit.bind(this)

	}

	componentWillReceiveProps(nextProps){
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
		 	name:this.state.name,
		 	email:this.state.email,
		 	password:this.state.password,
		 	password2:this.state.password2

		 }

		 this.props.registerUser(newUser,this.props.history)

	}

	render() {		

		  const {error}=this.state || {}

		  const {user}=this.props.auth
			

		return (
			
			<section className="container col-md-8 m-auto text-center">
			     
			      <h1 className="large text-primary">Sign Up</h1>
	      
			      <p className="lead"><i className="fas fa-user mr-3"></i> Create Your Account</p>
			      
			      <form className="form" noValidate onSubmit={this.onSubmit}>

				      <div className="form-group">
				          <input 
					          type="text" 
					          placeholder="Name" 
					          className={classnames('form-control form-control-lg',{'is-invalid':error.name})}
					          name="name" 
					          onChange={this.onChange}    
				          />

				          {error.email && (<div className="invalid-feedback">{error.email}</div>)}

				          <small className="form-text"> This site uses Gravatar so if you want a profile image, use a Gravatar email </small>

				        </div>
			     		      
			        <div className="form-group">
			          <input type="email" 
				          placeholder="Email Address" 
				          className={classnames('form-control form-control-lg',{'is-invalid':error.email})}
				          name="email" 
				          onChange={this.onChange}    
			          />

			          {error.email && (<div className="invalid-feedback">{error.email}</div>)}

			          <small className="form-text"> This site uses Gravatar so if you want a profile image, use a Gravatar email </small>

			        </div>
			        
			        <div className="form-group my-2">
			          <input
			            type="password"
			            placeholder="Password"
			            name="password"
			            minLength="6"
			            className={classnames('form-control form-control-lg',{'is-invalid':error.password })} 
			            onChange={this.onChange}
			          />
			          {error.password && (<div className="invalid-feedback">{error.password}</div>)}
			        </div>
			        
			        <div className="form-group my-4">
			          <input
			            type="password"
			            placeholder="Confirm Password"
			            name="password2"
			            minLength="6"
			            className={classnames('form-control form-control-lg',{'is-invalid':error.password2 })} 
			            
			            onChange={this.onChange}
			          />
			          {error.password2 && (<div className="invalid-feedback">{error.password2}</div>)}
			        </div>
			       
			        <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />

			      </form>

			      <p className="my-4">
			        Already have an account? <Link to="/login" > Login </Link>
			      </p>
		    </section>
  
		);
	}
}

Register.propTypes={
	registerUser:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired,
	error:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
	auth:state.auth,
	error:state.error
})

export default connect(mapStateToProps,{registerUser})(withRouter(Register));

