import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth } from '../../store/actions/userActions';
import Register from '../../components/register/Register';

class RegisterView extends Component {
	componentDidMount() {
		this.props.getAuth();
	}
	render() {
		return <Register />;
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
)(RegisterView);
