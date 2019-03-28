import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { firebase, googleAuth } from '../../firebase';
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
		firebase.auth().signInWithPopup(googleAuth);
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

export default withRouter(LoginView);
