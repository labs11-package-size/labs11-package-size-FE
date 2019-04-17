import axios from 'axios';

export const GETTING_SHIPMENTS = 'GETTING_SHIPMENT';
export const GETTING_SHIPMENTS_SUCCESSFUL = 'GETTING_SHIPMENT_SUCCESSFUL';
export const GETTING_SHIPMENTS_FAILURE = 'GETTING_SHIPMENT_FAILURE';

export const ADDING_SHIPMENT = 'ADDING_SHIPMENT';
export const ADDING_SHIPMENT_SUCCESSFUL = 'ADDING_SHIPMENT_SUCCESSFUL';
export const ADDING_SHIPMENT_FAILURE = 'ADDING_SHIPMENT_FAILURE';

export const DELETING_SHIPMENT = 'DELETING_SHIPMENT';
export const DELETING_SHIPMENT_SUCCESSFUL = 'DELETING_SHIPMENT_SUCCESSFUL';
export const DELETING_SHIPMENT_FAILURE = 'DELETING_SHIPMENT_FAILURE';

export const DELETING_PACKAGE = 'DELETING_PACKAGE';
export const DELETING_PACKAGE_SUCCESSFUL = 'DELETING_PACKAGE_SUCCESSFUL';
export const DELETING_PACKAGE_FAILURE = 'DELETING_PACKAGE_FAILURE';

export const addShipment = (trackingNumber, productId) => dispatch => {
	const trackingRequest = {
		trackingNumber,
		productId,
	};
	dispatch({ type: ADDING_SHIPMENT });

	axios
		.post('/shipments/add', trackingRequest)
		.then(res =>
			dispatch({ type: ADDING_SHIPMENT_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: ADDING_SHIPMENT_FAILURE, payload: err.data }),
		);
};

export const getShipments = () => dispatch => {
	dispatch({ type: GETTING_SHIPMENTS });
	axios
		.get('/shipments/all')
		.then(res =>
			dispatch({ type: GETTING_SHIPMENTS_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: GETTING_SHIPMENTS_FAILURE, payload: err.data }),
		);
};

export const deleteShipment = uuid => dispatch => {
	dispatch({ type: DELETING_SHIPMENT });
	axios
		.delete(`/shipments/deleteweb/${uuid}`)
		.then(res =>
			dispatch({ type: DELETING_SHIPMENT_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: DELETING_SHIPMENT_FAILURE, payload: err.data }),
		);
};

export const deletePackage = uuid => dispatch => {
	dispatch({ type: DELETING_PACKAGE });
	axios
		.delete(`/packaging/deleteweb/${uuid}`)
		.then(res =>
			dispatch({ type: DELETING_PACKAGE_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: DELETING_PACKAGE_FAILURE, payload: err.data }),
		);
};
