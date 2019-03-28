import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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

	render() {
		return (
			<Login
				username={this.state.username}
				password={this.UNSAFE_componentWillMount.state.password}
				email={this.state.email}
				error={this.state.error}
				handleInputChange={this.handleChanges}
			/>
		);
	}
}

export default withRouter(LoginView);
