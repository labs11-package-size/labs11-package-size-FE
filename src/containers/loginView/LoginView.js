import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/userActions';
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
		const userStats = {
			username: this.state.username,
			password: this.state.password,
		};
		if (!this.state.password) {
			this.setState({
				error: 'You must enter a password to continue.',
			});
		} else {
			this.props.loginUser(userStats);
			setTimeout(() => {
				this.props.history.push('/login');
			}, 1000);
		}
	};

	render() {
		return (
			<Login
				handleChange={this.handleChanges}
				loginSubmit={this.loginSubmit}
				username={this.state.username}
				password={this.state.password}
			/>
		);
	}
}
const mapStateToProps = state => {
	return {
		loggedIn: state.userReducer.isLoggedIn,
		loggingIn: state.userReducer.isLoggingIn,
	};
};

export default connect(
	mapStateToProps,
	{ loginUser },
)(LoginView);
