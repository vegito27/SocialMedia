import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom' 
import TextFieldGroup from '../../common/TextFieldGroup'
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'
import SelectListGroup from '../../common/SelectListGroup'
import InputGroup from '../../common/InputGroup'
import {createProfile} from '../../actions/profileActions'



class CreateProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state={
			displaySocialInputs:false,
			handle:'',
			company:'',
			website:'',
			location:'',
			status:'',
			skills:'',
			githubusername:'',
			bio:'',
			twitter:'',
			facebook:'',
			linkedin:'',
			youtube:'',
			instagram:'',
			error:{}
		}
		this.onSubmit=this.onSubmit.bind(this)
		this.onChange=this.onChange.bind(this)

	}

	onSubmit(e){
		e.preventDefault()

		const profileData= {

			handle:this.state.handle,
			company:this.state.company,
			website:this.state.website,
			location:this.state.location,
			status:this.state.status,
			skills:this.state.skills,
			githubusername:this.state.githubusername,
			bio:this.state.bio,
			twitter:this.state.twitter,
			facebook:this.state.facebook,
			linkedin:this.state.linkedin,
			youtube:this.state.youtube,
			instagram:this.state.instagram
		}

		this.props.createProfile(profileData,this.props.history)

	}

	componentWillReceiveProps(nextProps){

		if(nextProps.error){
			this.setState({error:nextProps.error})
		}


	}

	onChange(e){
		this.setState({[e.target.name]:e.target.value})
	}

	render() {

		const {error,displaySocialInputs}=this.state

		console.log(displaySocialInputs)

		let socialInputs;

		if(displaySocialInputs){
			socialInputs= (<div>

				<InputGroup 
					placeholder="Twitter Profile URL"
					name="twitter"
					icon="fab fa-twitter"
					value={this.state.twitter}
					onChange={this.onChange}
					error={error.twitter}
				/>

				<InputGroup 
					placeholder="Facebook Page URL"
					name="facebook"
					icon="fab fa-facebook"
					value={this.state.facebook}
					onChange={this.onChange}
					error={error.facebook}
				/>

				<InputGroup 
					placeholder="Linkedin Page URL"
					name="linkedin"
					icon="fab fa-linkedin"
					value={this.state.linkedin}
					onChange={this.onChange}
					error={error.linkedin}
				/>

				<InputGroup 
					placeholder="Youtube Page URL"
					name="youtube"
					icon="fab fa-youtube"
					value={this.state.youtube}
					onChange={this.onChange}
					error={error.youtube}
				/>

				<InputGroup 
					placeholder="Instagram Page URL"
					name="instagram"
					icon="fab fa-instagram"
					value={this.state.instagram}
					onChange={this.onChange}
					error={error.instagram}
				/>

				</div>
			)

		}

		const options=[
		{label:'* Select Professional Status',value:0 },
		{label:'Developer',value:'Developer'},
		{label:'Juniour Developer',value:'Juniour Developer'},
		{label:'Seniour Developer',value:'Seniour Developer'},
		{label:'Manager',value:'Manager'},
		{label:'Student or Learning',value:'Student or learning'},
		{label:'Instructor or Teacher',value:'Instructor or Teacher'},
		{label:'Intern',value:'Intern'},
		{label:'Others',value:'Other'}
		]

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p>Lets get some information to make your profile standout </p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>

							<TextFieldGroup 
								placeholder="* Profile Handle" 
								name="handle" 
								value={this.state.handle}
								onChange={this.onChange}
								error={error.handle}
								info="A unique handle for your Profile Url.Your full Name,company Name,nickname etc(That cant be changed)"
							/>

							<SelectListGroup 
								placeholder="Status" 
								name="status"  
								options={options}
								value={this.state.status}
								onChange={this.onChange}
								error={error.status}
								info="Give us an idea of where you are at in your career "
							/>

							<TextFieldGroup 
								placeholder="Company" 
								name="company" 
								value={this.state.company}
								onChange={this.onChange}
								error={error.company}
								info="Could be your company or one you work for"
							/>
							<TextFieldGroup 
								placeholder="Website" 
								name="website" 
								value={this.state.website}
								onChange={this.onChange}
								error={error.website}
								info="Could be your website or company one"
							/>

							<TextFieldGroup 
								placeholder="Location" 
								name="location" 
								value={this.state.location}
								onChange={this.onChange}
								error={error.location}
								info="city or city && state suggested(eg.Mumbai,Delhi)"
							/>

							<TextFieldGroup 
								placeholder="* Skills" 
								name="skills" 
								value={this.state.skills}
								onChange={this.onChange}
								error={error.skills}
								info="Please use comma separarted values (eg.HTML,CSS,JavaScript,Php )"
							/>

							<TextFieldGroup 
								placeholder="GitHubUserName " 
								name="githubusername" 
								value={this.state.githubusername}
								onChange={this.onChange}
								error={error.githubusername}
								info="If you want latest repos and a GitHub Links ,Include your username"
							/>

							<TextAreaFieldGroup 
								placeholder="Short Bio " 
								name="bio" 
								value={this.state.bio}
								onChange={this.onChange}
								error={error.bio}
								info="Tell us a little about yourself"
							/>

							<div className="mb-3">
								<button type="button "
									onClick={()=>{this.setState(prevState=>({
									displaySocialInputs:!prevState.displaySocialInputs

								})
							)}} className="btn btn-light">Add Social Network Links</button>

								<span className="text-muted">Optional</span>

							</div>

							{socialInputs}
							<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />


							</form>


						</div>
					</div> 
				</div> 
			</div>
		);
	}
}

CreateProfile.propTypes={
	profile:PropTypes.object.isRequired,
	error:PropTypes.object.isRequired 
}


const mapStateToProps=state=>({

	profile:state.profile,
	error:state.error
})


export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile))
