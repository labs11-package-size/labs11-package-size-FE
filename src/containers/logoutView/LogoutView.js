import React, { Component } from 'react';
import { logoutUser, getAuth } from '../../store/actions/userActions';
import Logout from '../../components/logout/Logout';
import { connect } from 'react-redux';

class LogoutView extends Component {
	render() {
		const redir = () => {
			this.props.logoutUser();
			setTimeout(() => {
				this.props.history.push('/login');
			}, 2000);
		};
		return (
			<div>
				<Logout redir={redir} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedOut: state.userReducer.isLoggedOut,
	};
};

export default connect(
	mapStateToProps,
	{ logoutUser, getAuth },
)(LogoutView);
