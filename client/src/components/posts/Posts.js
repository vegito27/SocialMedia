import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PostForm from './PostForm'
import Spinner from '../../common/Spinner'
import {withRouter} from 'react-router-dom' 
import {getPosts} from '../../actions/postActions'
import PostFeed from './PostFeed'

class Posts extends React.Component {

	componentDidMount(){
		this.props.getPosts()

	}	

	render() {

		const {posts,loading}=this.props.post;

		let postContent;

		if(posts===null || loading){

			postContent=<Spinner />

		}else{

			postContent=<PostFeed posts={posts} />

		}

		return (
			<div className="feed">
				<div className="container ">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
							{postContent}
						</div>
					</div>
				</div>
				 <div style={{marginBottom:'120px'}} />
			</div>
		);
	}
}

Posts.propTypes={
	getPosts:PropTypes.func.isRequired,
	post:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
	post:state.post
})


export default connect(mapStateToProps,{getPosts})(Posts)