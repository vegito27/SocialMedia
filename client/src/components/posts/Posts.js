import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PostForm from './PostForm'
import Spinner from '../../common/Spinner'
import {withRouter} from 'react-router-dom' 

class Posts extends React.Component {
	

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="feed">
				<div className="container ">
					<div className="row">
						<div className="col-md-12">
							<h1>Hello</h1>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null)(withRouter(Posts))