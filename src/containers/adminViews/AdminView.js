import React, { Component } from 'react';
import LoginView from './loginView/LoginView';
import SignupView from './signupView/SignupView';

class AdminView extends Component {
	state = {
		registering: false,
	};

	handleRegister = () => {
		this.setState({
			registering: !this.state.isRegistering,
		});
	};
	render() {
		return (
			<div>
				{this.state.registering === false ? (
					<LoginView
						handleRegister={this.handleRegister}
						isRegistering={this.state.registering}
					/>
				) : (
					<SignupView />
				)}
			</div>
		);
	}
}

export default AdminView;
