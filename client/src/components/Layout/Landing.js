import React from 'react';
import {Link} from 'react-router-dom'

export default class Landing extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			    <section className="landing">
			      <div className="dark-overlay landing-inner text-light">
			        <div className="col-md-12 text-center">
			          <h1 className="display-3 mb-4">Developer Connector</h1>
			          <p className="lead">
			            Create a developer profile/portfolio, share posts and get help from
			            other developers
			          </p>
			          <div className="buttons">
			            <Link to="/register" className="btn btn-primary mr-2">Sign Up</Link>
			            <Link to="/login" className="btn btn-light ">Login</Link>
			          </div>
			        </div>
			      </div>
			    </section>
			</div>
		);
	}
}

