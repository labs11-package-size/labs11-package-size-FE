import React from 'react';
import ShipmentList from '../../components/shipment/ShipmentList';

const ShipmentListView = props => {
	return <ShipmentList user={props.user} />;
};

export default ShipmentListView;
