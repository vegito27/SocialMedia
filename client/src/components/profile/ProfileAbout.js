import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import isEmpty from '../../validations/is-empty'
import {connect} from 'react-redux'
import {Profile} from '../../components/profile/Profile'


class ProfileAbout extends React.Component {
	

	render() {

		const {profile}=this.props;

		const firstName=this.props.profile.user

		const skills=profile.skills.map((skill,index)=>(

			<div key={index} className="p-3">
				<i className="fa fa-check" />{skill}
			</div> 
			))

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-light mb-3">
					<h3 className="text-center text-info">{profile.user.name}'s Bio</h3>
						<p className="lead">{isEmpty(profile.bio)?<span>{profile.user.name} does not have Bio</span>:(<span>{profile.bio}</span>)}</p>
							<hr />
						<h3 className="text-center text-info">Skill Set</h3>
						 <div className="row">
							<div className="d-flex flex-wrap justify-content-center align-items-center">
								{skills}
							</div>
						</div>
					</div>
				</div>
			</div>
			
		);
	}
}


ProfileAbout.propTypes=
{
	profile:PropTypes.object.isRequired
}

export default ProfileAbout