import React from 'react';
import PropTypes from 'prop-types'
import PostItem from './PostItem'

class PostFeed extends React.Component {
	

	constructor(props) {
		super(props);
	}

	render() {
		const {posts}=this.props;

		return (
			posts.map(post=><PostItem key={post._id} post={post}/>)
		);
	} 
}

PostFeed.propTypes={
	 posts:PropTypes.func.isRequired
}

export default PostFeed
