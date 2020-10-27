import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import {getPost} from '../../actions/postActions'
import PostItem from '../posts/PostItem'
import {Link} from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'

class Post extends React.Component {

	componentDidMount(){
		this.props.getPost(this.props.match.params.id)
	}

	constructor(props) {
		super(props);
	}

	render() {

		const {post,loading}=this.props.post;

		let postContent;

		if(post==null || loading || Object.keys(post).length===0 ){

			postContent=<Spinner />

		}else{

			postContent=
				(
					<div>
						<PostItem post={post} showActions={false} />
						<CommentForm postId={post._id} />
						<CommentFeed postId={post._id} comments={post.comments}   />
					</div>
					)
		}

		return (
			<div clasName="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" className="btn btn-light mb-3">Back To Feed</Link>
							{postContent}
							<div style={{marginBottom:'120px'}} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes={
	getPost:PropTypes.func.isRequired,
	posts:PropTypes.object.isRequired,

}


const mapStateToProps=state=>({
	post:state.post
})


export default connect(mapStateToProps,{getPost})(Post)