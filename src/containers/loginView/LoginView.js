import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { firebase, googleAuth } from '../../firebase';
import Login from '../../components/login/Login';
import axios from 'axios';

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
		firebase
			.auth()
			.signInWithPopup(googleAuth)
			.then(res => {
				const user = {
					uid: res.user.uid,
					displayName: res.user.displayName,
					email: res.user.email,
				};
				axios
					.post('https://scannarserver.herokuapp.com/api/users/login', user)
					.then(res => localStorage.setItem('token', res.data.token))
					.catch(err => console.log('error', err));
			})
			.catch(err => console.log(err));
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
