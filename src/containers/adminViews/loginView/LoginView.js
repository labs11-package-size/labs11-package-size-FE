import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginUser, emailLogin } from '../../../store/actions/userActions';
import Login from '../../../components/admin/login/Login';

class LoginView extends Component {
	state = {
		user: {
			email: '',
			password: '',
		},
		error: 'invalid credentials',
	};

	handleChanges = event => {
		this.setState({
			user: {
				[event.target.name]: event.target.value,
			},
		});
	};

	handleEmailLogin = () => {
		this.props.emailLogin();
	};

	handleLogin = () => {
		this.props.loginUser();
	};

	render() {
		return (
			<Login
				password={this.state.user.password}
				email={this.state.user.email}
				user={this.state.user}
				error={this.state.error}
				handleInputChange={this.handleChanges}
				handleEmailLogin={() => this.handleEmailLogin(this.state.user)}
				handleLogin={this.handleLogin}
			/>
		);
	}
}
const mapStateToProps = state => {
	return {
		isLoggedIn: state.userReducer.isLoggedIn,
	};
};

export default connect(
	mapStateToProps,
	{ loginUser, emailLogin },
)(withRouter(LoginView));
