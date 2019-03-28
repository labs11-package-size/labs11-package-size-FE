import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { firebase, googleAuth } from '../../firebase';
import Login from '../../components/login/Login';

class LoginView extends Component {
	state = {
		username: '',
		password: '',
		error: '',
	};

	handleChanges = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	loginSubmit = event => {
		event.preventDefault();
		firebase.auth().signInWithPopup(googleAuth);
		return setTimeout(() => {
			this.props.history.push('/');
		}, 1000);
	};

	render() {
		return <Login loginSubmit={this.loginSubmit} />;
	}
}

export default withRouter(LoginView);
