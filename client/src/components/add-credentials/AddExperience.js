import React from 'react';
import {Link,withRouter} from 'react-router-dom'
import TextFieldGroup from '../../common/TextFieldGroup'
import TextAreaFieldGroup  from '../../common/TextAreaFieldGroup'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addExperience} from '../../actions/profileActions'

 class AddExperience extends React.Component {

 	constructor(props){
 		super(props);

 		this.state={
 			company:'',
 			title:'',
 			location:'',
 			from:'',
 			to:'',
 			current:false,
 			description:'',
 			error:'',
 			disabled:false
 		}
 		this.onChange=this.onChange.bind(this)
 		this.onSubmit=this.onSubmit.bind(this)
 		this.onCheck=this.onCheck.bind(this)
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
 		e.preventDefault()

 		const expData={

 			company:this.state.company,
 			title:this.state.title,
 			location:this.state.location,
 			from:this.state.from,
 			to:this.state.to,
 			current:this.state.current,
 			description:this.state.description
 		}


 		this.props.addExperience(expData,this.props.history)
 	}

 	onCheck(e){
 		this.setState({
 			disabled:!this.state.disabled,
 			current:!this.state.current
 		})
 	}
	
	render() {

		const {error}=this.state

		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
						<Link to="/dashboard" className="btn btn-primary">Go Back</Link>
						<h4 className="display text-center">Add Experience</h4>
						<p className="lead text-center">Add any job or position that you have in the past or current</p>
						<small className="d-blockpb-3">* = required fields</small>

						<form onSubmit={this.onSubmit}>
							<TextFieldGroup 
								 placeholder="Company"
								 name="company"
								 value={this.state.company}
								 onChange={this.onChange}
								 error={error.company}
							 />

							 <TextFieldGroup 
								 placeholder="* Job Title"
								 name="title"
								 value={this.state.title}
								 onChange={this.onChange}
								 error={error.title}
							 />

							 <TextFieldGroup 
								 placeholder="Location"
								 name="location"
								 value={this.state.location}
								 onChange={this.onChange}
								 error={error.location}
							 />
							 <h6>Form Date</h6>

							 <TextFieldGroup 
								 placeholder="From"
								 name="from"
								 type="date"
								 value={this.state.from}
								 onChange={this.onChange}
								 error={error.from}
							 />

							 <h6>To Date</h6>

							 <TextFieldGroup 
								 placeholder="To"
								 name="to"
								 type="date"
								 value={this.state.to}
								 onChange={this.onChange}
								 error={error.to}
								 disabled={this.state.disabled?'disabled':''}
							 />

							 <div className="form-check mb-4">

							 <input 
								 type="checkbox"
								 className="form-check-input"
								 name="current"
								 value={this.state.current}
								 checked={this.state.current}
								 onChange={this.onCheck}
								 id="current"
							 />
							 <label htmlFor="current" className="form-check-label" >Current Job</label>

							 </div>

							  <TextAreaFieldGroup 
								 placeholder="Job Description"
								 name="description"
								 type="date"
								 value={this.state.description}
								 onChange={this.onChange}
								 error={error.description}
								 info="Tell us about the position"
							 />

							 <input type="submit" value="Submit" className="btn btn-info btn-block "/>
							 <div style={{marginBottom:'120px'}} />
						</form>

						</div>
					</div>
				</div>
			</div>
		);
	}
}


AddExperience.propTypes={
	addExperience:PropTypes.func.isRequired,
	profile:PropTypes.object.isRequired,
	error:PropTypes.object.isRequired
}


const mapStateToProps=state=>({

	profile:state.profile,
	error:state.error



})

export default connect(mapStateToProps,{addExperience})(withRouter(AddExperience))