import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import {
	googleLogin,
	emailLogin,
	register,
} from '../../../store/actions/userActions';
import Login from '../../../components/admin/login/Login';

class LoginView extends Component {
	state = {
		user: {
			email: '',
			password: '',
		},
		error: null,
	};

	handleChanges = event => {
		this.setState({
			user: {
				...this.state.user,
				[event.target.name]: event.target.value,
			},
		});
	};

	handleGoogleLogin = () => {
		this.props.googleLogin();
	};

	handleEmailLogin = event => {
		event.preventDefault();
		this.props.emailLogin(this.state.user);

		this.setState({
			user: {
				emailAddress: '',
				password: '',
			},
		});
	};

	render() {
		return (
			<div>
				<Login
					password={this.state.user.password}
					email={this.state.user.email}
					user={this.state.user}
					error={this.props.errMessage}
					handleInputChange={this.handleChanges}
					handleRegister={this.props.handleRegister}
					isRegistering={this.props.isRegistering}
					handleGoogleLogin={this.handleGoogleLogin}
					handleEmailLogin={this.handleEmailLogin}
				/>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		errMessage: state.userReducer.error,
	};
};

export default connect(
	mapStateToProps,
	{ googleLogin, emailLogin, register },
)(withRouter(LoginView));
