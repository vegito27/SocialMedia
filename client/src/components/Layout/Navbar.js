import React from 'react';
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
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

							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/register">SignUp</Link>
								</li>

								<li className="nav-item">
									<Link className="nav-link" to="/login">Login</Link>
								</li>
							</ul>
						</div>	

					</div>	
				</nav>		
			
		);
	}
}

export default Navbar