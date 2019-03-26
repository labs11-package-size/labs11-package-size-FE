import axios from 'axios';

export const GETTING_SHIPMENT = 'GETTING_SHIPMENT';
export const GETTING_SHIPMENT_SUCCESSFUL = 'GETTING_SHIPMENT_SUCCESSFUL';
export const GETTING_SHIPMENT_FAILURE = 'GETTING_SHIPMENT_FAILURE';

export const GETTING_SHIPMENTS = 'GETTING_SHIPMENTS';
export const GETTING_SHIPMENTS_SUCCESSFUL = 'GETTING_SHIPMENTS_SUCCESSFUL';
export const GETTING_SHIPMENTS_FAILURE = 'GETTING_SHIPMENTS_FAILURE';

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

export const getShipments = () => dispatch => {
	dispatch({ type: GETTING_SHIPMENTS });
	axios
		.get('https://scannar-be.herokuapp.com/api/shipments')
		.then(res => dispatch({ type: GETTING_SHIPMENTS_SUCCESSFUL, payload: res.data }))
		.catch(err => dispatch({ type: GETTING_SHIPMENTS_FAILURE, payload: err.data}));
};
