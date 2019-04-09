import React, { Component } from 'react';
import { logoutUser, getAuth } from '../../../store/actions/userActions';
import { connect } from 'react-redux';

class LogoutView extends Component {
	componentDidMount() {
		this.props.logoutUser();
		this.props.logoutUser();
		setTimeout(() => {
			this.props.history.push('/login');
		}, 2000);
	}
	render() {
		return <div>Sorry to see you go.</div>;
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
