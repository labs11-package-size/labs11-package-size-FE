import React, { Component } from 'react';
import Account from '../../components/account/Account';
import { connect } from 'react-redux';

import {
	getAuth,
	getAccountInfo,
	editUser,
} from '../../store/actions/userActions';

class AccountView extends Component {
	state = {
		user: {
			displayName: '',
			email: '',
		},
		userInfo: {
			displayName: '',
			email: '',
		},
	};

	handleInputChange = e => {
		this.setState({
			user: {
				[e.target.name]: e.target.value,
			},
		});
	};

	editAccount = user => {
		this.props.editAccount(user);
		this.setState({ editingUserInfo: false });
	};

	componentDidMount() {
		this.props.getAuth();
		return this.props.userInfo;
	}

	render() {
		return (
			<div>
				<Account
					editAccount={() => this.editAccount(this.state.userInfo)}
					handleInputChange={this.handleInputChange}
					// editingUserInfo={this.editingUserInfo}
					userInfo={this.state.userInfo}
				/>
			</div>
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
	{ getAuth, editUser },
)(AccountView);
