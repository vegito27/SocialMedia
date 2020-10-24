import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logOutUser} from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

class Navbar extends React.Component {


	onLogoutClick(e){

		e.preventDefault();

		this.props.clearCurrentProfile()
		
		this.props.logOutUser();
	}

	render() {

		const { isAuthenticated,user}= this.props.auth

		const authlinks=(
			<ul className="navbar-nav ml-auto">

				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">Dashboard  </Link>
				</li>

				<li className="nav-item">
					<a href="#" onClick={this.onLogoutClick.bind(this)} className="nav-link">
						<img className="rounded-circle" src={user.avatar} alt={user.name} style={{width:'25px',marginRight:'5px'}} title="You must have a gratar connected to your email to display " />
							Logout
						</a>
				</li>
			</ul>
		)


		const guestLinks=(
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">SignUp</Link>
				</li>

				<li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
			</ul>
		)



		return (
			
				<nav className="nav navbar-expand-sm navbar-dark bg-dark mb-4">
					<div className="container">

						<div className="collapse navbar-collapse mt-2 mb-2" id="mobile-nav">

						<Link className="navbar-brand" to="/">DevConnector</Link>
						 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
						 	<span className="navbar-toggler" />
						 </button>
						
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/profiles">Developer</Link>
								</li>
							</ul>

							{isAuthenticated ? authlinks:guestLinks}

						</div>	
					</div>	
				</nav>		
			
		);
	}
}

Navbar.propTypes={
	logOutUser:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired
}


const mapStateToProps=state=>({
	auth:state.auth
})


export default connect(mapStateToProps,{logOutUser,clearCurrentProfile})(Navbar)



