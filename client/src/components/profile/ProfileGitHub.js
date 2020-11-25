import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'


class ProfileGitHub extends React.Component {
	
	constructor(props) {
		super(props);
		this.state={
			clientId:'736597b64d860464788e',
			clientSecret:'d3a331db07db2be5c697309ac725a59baeaf370c',
			count:5,
			sort:'created:asc ',
			repos:[]
		}
	}

	componentDidMount(){

		const {username}=this.props;

		const {count,sort,clientId,clientSecret}=this.state;
		
		fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
		.then(res=>res.json())
		.then(data=>{

				this.setState({repos:data})
		
		})
		.catch(err=>console.log(err)) 

	}

	render() {

		const {repos}=this.state;

		const repoItems=repos.map(repo=>(
			<div key={repo.id} className="card card-body mb-2">

				<div className="row">
					<h4><a href={repo.html_url} className="text-info" target="_blank">{repo.name} </a></h4>
					<p>{repo.description}</p>
				</div>

				<div className="col-md-6">
					<span className="badge badge-info mr-1">Stars:{repo.stargazers_count}</span>
					<span className="badge badge-secondary mr-1">Watchers:{repo.watchers_count}</span>
					<span className="badge badge-success ">Forks:{repo.forks_count}</span>
				</div>
			</div>
			
			))
		return (
			<div>
				<hr />
				<h3 className="mb-4">Latest GitHub Repos</h3>
				{repoItems}
			</div>
		);
	}
}

ProfileGitHub.propTypes={
	username:PropTypes.string.isRequired
}

export default ProfileGitHub




