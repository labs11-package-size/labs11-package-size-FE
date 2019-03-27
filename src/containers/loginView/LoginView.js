import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/userActions';
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
const mapStateToProps = state => {
	return {
		loggedIn: state.userReducer.isLoggedIn,
		loggingIn: state.userReducer.isLoggingIn,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{ loginUser },
	)(LoginView),
);
