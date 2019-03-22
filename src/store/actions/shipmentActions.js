import axios from 'axios';

export const GETTING_SHIPMENT = 'GETTING_SHIPMENT';
export const GETTING_SHIPMENT_SUCCESSFUL = 'GETTING_SHIPMENT_SUCCESSFUL';
export const GETTING_SHIPMENT_FAILURE = 'GETTING_SHIPMENT_FAILURE';

export const getShipment = trackingInfo => dispatch => {
	dispatch({ type: GETTING_SHIPMENT });

	axios
		.post('https://scannar-be.herokuapp.com/api/shipments/tracking', trackingInfo)
		.then(res =>
			dispatch({ type: GETTING_SHIPMENT_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: GETTING_SHIPMENT_FAILURE, payload: err.data }),
		);
};
