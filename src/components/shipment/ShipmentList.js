import React, { Component } from 'react';

import Shipment from './Shipment';

class ShipmentList extends Component {
	render() {
		return (
			<div>
				{!this.props.shipments ? ( //shipments plural
					<h5>...loading</h5>
				) : (
					this.props.shipments.map(shipment => {
						//shipments plural
						return <Shipment key={shipment.identifier} shipment={shipment} />;
					})
				)}
			</div>
		);
	}
}

export default ShipmentList;
