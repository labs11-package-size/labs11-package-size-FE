import React, { Component } from 'react';
import ShipmentList from '../../components/shipment/ShipmentList';
import { connect } from 'react-redux';
import { getAuth } from '../../store/actions/userActions';

class ShipmentListView extends Component {
	componentDidMount() {
		this.props.getAuth();
	}
	render() {
		return <ShipmentList />;
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
)(ShipmentListView);
