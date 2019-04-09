import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth } from '../../../store/actions/userActions';
import Signup from '../../../components/admin/siginup/Signup';

class SignupView extends Component {
	componentDidMount() {
		this.props.getAuth();
	}
	render() {
		return <Signup />;
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
)(SignupView);
