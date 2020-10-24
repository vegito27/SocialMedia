import React from 'react';
import spinner from './spinner.gif'

export default class Spinner extends React.PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			<img src={spinner} style={{width:"200px",margin:'auto',display:'block' }} alt="Loading..." />

			</div>
		);
	}
}
