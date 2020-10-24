import React from 'react';
import {connect} from 'react-redux'
import PropTypes from  'prop-types'
import {withRouter} from 'react-router-dom'
import Moment from 'react-moment'

 

 class Experience extends React.PureComponent {

	constructor(props) {
		super(props);
	}

	render() {

		console.log(this.props.experience)


		const  experience=this.props.experience.map(exp=>(

			<tr key={exp._id}>

				<td>{exp.company}</td>
				<td>{exp.title}</td>

				<td><Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
				 <Moment format="YYYY/MM/DD">{exp.to}</Moment></td>

				<td><button className="btn btn-danger">Delete</button></td>

			</tr>
			))


		return (
			<div >
			<h4 className="mb-4 mt-4">Experience Credentials </h4>
			<table className="table">
				<thead>
					<tr>
						<th>Comapny</th>
						<th>Title</th>
						<th>Years</th>
						<th>Actions</th>
					</tr>

				
				{experience}
				



				</thead>
			</table>


			</div>
		);
	}
}


export default connect(null)(withRouter(Experience))