import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/userActions';
import Login from '../../components/login/Login';

class LoginView extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		error: 'invalid credentials',
	};

	handleChanges = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleLogin = () => {
		this.props.loginUser();
	};

	render() {
		return (
			<Login
				username={this.state.username}
				password={this.state.password}
				email={this.state.email}
				error={this.state.error}
				handleInputChange={this.handleChanges}
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
	{ loginUser },
)(withRouter(LoginView));
