import React, { Component } from 'react';
// import Logout from '../../components/logout/Logout';
import { logoutUser } from '../../store/actions/userActions';
import { connect } from 'react-redux';

class LogoutView extends Component {
	componentDidMount() {
		this.props.logoutUser();
	}
	render() {
		return (
			<div>
				Sorry to see you go.
				{setTimeout(() => {
					this.props.history.push('/login');
				}, 2000)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedOut: state.userReducer.isLoggedOut,
	};
};

export default connect(
	mapStateToProps,
	{ logoutUser },
)(LogoutView);
