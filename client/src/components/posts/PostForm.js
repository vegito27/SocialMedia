import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../common/Spinner'
import {addPost} from '../../actions/postActions'
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'


 class PostForm extends React.Component {

	constructor(props) {
		
		super(props);

		this.state={
			text:'',
			error:{} 
		}

		this.onChange=this.onChange.bind(this)
 		this.onSubmit=this.onSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps){
		 if(nextProps.error)
		 {
		 	this.setState({error:nextProps.error})
		 }
	}


	onSubmit(e){

		e.preventDefault();

		console.log(this.props)

		const {user}=this.props.auth

		const newPost={

			text:this.state.text,
			name:user.name,
			avatar:user.avatar
		}

		this.props.addPost(newPost);
		
		this.setState({text:' '})
	}

	onChange(e){

 		this.setState({[e.target.name]:e.target.value})

 	}


	render() {

		const {error}=this.state

		return (
			<div className="post-form mb-3">
				<div className="card card-info">
				<div className="card-header bg-info text-white">Say Something..</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							
							<div className="form-group">

								<TextAreaFieldGroup placeholder="Create Post" name="text" value={this.state.text} onChange={this.onChange} error={error.text} />

							</div>

							<button type="submit" className="btn btn-dark">Submit</button>

						</form>
					</div>
				
				</div>
			</div>
		);
	}
}

PostForm.propTypes={
	addPost:PropTypes.func.isRequired,
	auth:PropTypes.object.isRequired,
	error:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth,
	error:state.error

})


export default connect(mapStateToProps,{addPost})(PostForm)




