import {
	GETTING_SHIPMENT,
	GETTING_SHIPMENT_SUCCESSFUL,
	GETTING_SHIPMENT_FAILURE,
} from '../actions/shipmentActions';

const initialState = {
	shipment: [],
	fetching: false,
	success: false,
	failure: false,
	error: null,
};

const shipmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETTING_SHIPMENT:
			return {
				...state,
				fetching: true,
				success: false,
				failure: false,
				error: null,
			};
		case GETTING_SHIPMENT_SUCCESSFUL:
			return {
				...state,
				products: action.payload,
				fetching: false,
				success: true,
				failure: false,
				error: null,
			};
		case GETTING_SHIPMENT_FAILURE:
			return {
				...state,
				fetching: false,
				success: false,
				failure: true,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default shipmentReducer;
