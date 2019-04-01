import React, { Component } from 'react';
import { connect } from 'react-redux';

import ShipmentList from '../../components/shipment/ShipmentList';
import { getShipments } from '../../store/actions/shipmentActions';

class ShipmentListView extends Component {
	componentDidMount() {
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
	{ getShipments },
)(ShipmentListView);
