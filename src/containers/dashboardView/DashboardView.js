import React, { Component } from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import { getAuth } from '../../store/actions/userActions';
import { connect } from 'react-redux';

class DashboardView extends Component {
	componentDidMount() {
		this.props.getAuth();
	}
	render() {
		return (
			<div>
				<Dashboard />
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
)(DashboardView);
