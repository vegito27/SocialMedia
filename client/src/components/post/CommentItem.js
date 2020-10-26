import React from 'react';
import {connect } from 'react-redux'
import PropTypes from 'prop-types'
import {deleteComment} from '../../actions/postActions'

 class CommentItem extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onDeleteClick(postId,commentId){

		this.props.deleteComment(postId,commentId)

	}

	render() {

		const {comment,postId,auth}=this.props

		return (
		<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">

						<img href="profile.html" className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
						<br />
						<p className="text-center d-inline" >{comment.name}</p>

						<div className="col-md-10 d-inline">

							<p className="lead">{comment.text}</p>
							
							{ comment.user===auth.user.id?(
								<span>
									<button
										onClick={this.onDeleteClick.bind(this,postId,comment._id)}
										type="button"
										className="btn btn-danger mr-1"><i className="fas fa-times" ></i>

									</button>

								</span>) : null }

								 
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CommentItem.propTypes={
	deleteComment:PropTypes.func.isRequired,
	comment:PropTypes.object.isRequired,
	postId:PropTypes.string.isRequired,
	auth:PropTypes.object.isRequired
}



const mapStateToProps=state=>({
	auth:state.auth
})


export default connect(mapStateToProps,{deleteComment})(CommentItem)