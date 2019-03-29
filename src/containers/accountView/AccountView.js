import React, { Component } from 'react';
import Account from '../../components/account/Account';
import { connect } from 'react-redux';
import { getAuth } from '../../store/actions/userActions';

class AccountView extends Component {
	componentDidMount() {
		this.props.getAuth();
	}
	render() {
		return (
			<div>
				<Account />
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
	{ getAuth },
)(AccountView);
