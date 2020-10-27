import React from 'react';

export default class Footer extends React.Component {
	
	
	constructor(props) {
		super(props);
	}

	render() {
		return (

			<footer className="bg-dark text-white mt-5 p-4 text-center footer fixed-bottom">
				Copyright &copy;{new Date().getFullYear()} DevConnector

			</footer>
		);
	}
}
