import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux' 
import {getCurrentProfile,deleteAccount} from '../../actions/profileActions'
import Spinner from '../../common/Spinner'
import {Link} from 'react-router-dom'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends React.Component {

	componentDidMount(){
			this.props.getCurrentProfile() 	
		} 

	onDeleteClick(e){
			this.props.deleteAccount()
		}

	render() {

		const {user}=this.props.auth

		console.log(this.props)

	    const {profile,loading}=this.props.profile;

		let dashboardContent;

		if(profile === null || loading){

			dashboardContent=<Spinner />

		}else{

			if(Object.keys(profile).length>0){
			
			dashboardContent=(
					<div>
						<p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
						<ProfileActions />
						<Experience experience={profile.experience} />
						<hr className="mt-5 mb-5"/>
						<Education education={profile.education} />
						<div style={{marginBottom:'60px'}} />
						<button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>

					</div>)

			}
			else{

				dashboardContent=(
					<div>
						<p className="lead text-muted">Welcome {user.name}</p>
						<p>You have not yet set up profile,Please add some information</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
					</div>
				)	
			}}

		return (
			<div className="dashboard">

			   <div className="container">
				   <div className="row">
					   <div className="col">
						   <h4 className="display-4">Dashboard</h4>

						   {dashboardContent}

					   </div>
				   </div>
			   </div>
			   <div style={{marginBottom:'120px'}} />
			</div>
		);
	}
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps=state=>({
	profile:state.profile,
	auth:state.auth
})

export default connect(mapStateToProps,{ getCurrentProfile ,deleteAccount})(Dashboard)


