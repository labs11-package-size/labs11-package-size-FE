import React, { Component } from 'react';
import ShipmentList from '../../components/shipment/ShipmentList';
import { connect } from 'react-redux';
import { getAuth } from '../../store/actions/userActions';
import { getShipments } from '../../store/actions/shipmentActions';

class ShipmentListView extends Component {
	componentDidMount() {
		this.props.getAuth();
		this.props.getShipments();
	}
	render() {
		return <ShipmentList shipments={this.props.shipments} />;
	}
}

const mapStateToProps = state => {
	return {
		shipments: state.shipmentReducer.shipments,
	};
};

export default connect(
	mapStateToProps,
	{ getAuth, getShipments },
)(ShipmentListView);
