import React, { Component } from 'react';
import Account from '../../components/account/Account';
import { connect } from 'react-redux';

import { getAuth, getAccountInfo, editUser } from '../../store/actions/userActions';
import EditAccount from '../../components/account/EditAccount';

class AccountView extends Component {
	componentDidMount() {
		this.props.getAuth();
		this.props.getAccountInfo();
	}
	render() {
		return (
			<div>
				<Account 
					user={this.props.userInfo}
				/>
				<EditAccount 
					user={this.props.userInfo} 
					editUser={this.editUser}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.userReducer.isLoggedIn,
		userInfo: state.userReducer.userInfo,
	};
};

export default connect(
	mapStateToProps,
	{ getAuth, getAccountInfo, editUser },
)(AccountView);
