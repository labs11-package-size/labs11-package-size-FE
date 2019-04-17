import {
	GETTING_SHIPMENTS,
	GETTING_SHIPMENTS_SUCCESSFUL,
	GETTING_SHIPMENTS_FAILURE,
	ADDING_SHIPMENT,
	ADDING_SHIPMENT_SUCCESSFUL,
	ADDING_SHIPMENT_FAILURE,
	DELETING_SHIPMENT,
	DELETING_SHIPMENT_SUCCESSFUL,
	DELETING_SHIPMENT_FAILURE,
	DELETING_PACKAGE,
	DELETING_PACKAGE_SUCCESSFUL,
	DELETING_PACKAGE_FAILURE,
} from '../actions/shipmentActions';

import moment from "moment"

const initialState = {
	shipments: [],
	fetching: false,
	adding: false,
	added: false,
	editing: false,
	deleting: false,
	success: false,
	failure: false,
	error: null,
};

const shipmentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETTING_SHIPMENTS:
			return {
				...state,
				fetching: true,
				error: null,
			};

		case GETTING_SHIPMENTS_SUCCESSFUL:
			return {
				...state,
				shipments: action.payload.map(shipment => {shipment.shipDateUnix = moment(shipment.lastUpdated).format('x'); return shipment}),
				fetching: false,
				success: true,
				failure: false,
				error: null,
			};

		case GETTING_SHIPMENTS_FAILURE:
			return {
				...state,
				fetching: false,
				success: false,
				failure: true,
				error: action.payload,
			};

		case ADDING_SHIPMENT:
			return {
				...state,
				adding: true,
				success: false,
				failure: false,
				error: null,
			};

		case ADDING_SHIPMENT_SUCCESSFUL:
			return {
				...state,
				shipments: action.payload,
				fetching: false,
				adding: false,
				success: true,
				failure: false,
				error: null,
			};

		case ADDING_SHIPMENT_FAILURE:
			return {
				...state,
				fetching: false,
				success: false,
				failure: true,
				error: action.payload,
			};

		case DELETING_SHIPMENT:
			return {
				...state,
				shipments: [],
				fetching: false,
				adding: false,
				editing: false,
				deleting: true,
				success: false,
				failure: false,
				error: null,
			};
		case DELETING_SHIPMENT_SUCCESSFUL:
			return {
				...state,
				shipments: action.payload.map(shipment => {shipment.shipDateUnix = moment(shipment.lastUpdated).format('x'); return shipment}),
				fetching: false,
				adding: false,
				editing: false,
				deleting: false,
				success: true,
				failure: false,
				error: null,
			};
		case DELETING_SHIPMENT_FAILURE:
			return {
				...state,
				fetching: false,
				adding: false,
				editing: false,
				deleting: false,
				success: false,
				failure: true,
				error: action.payload,
			};
			case DELETING_PACKAGE:
			return {
				...state,
				shipments: [],
				fetching: false,
				adding: false,
				editing: false,
				deleting: true,
				success: false,
				failure: false,
				error: null,
			};
		case DELETING_PACKAGE_SUCCESSFUL:
			return {
				...state,
				shipments: action.payload.map(shipment => {shipment.shipDateUnix = moment(shipment.lastUpdated).format('x'); return shipment}),
				fetching: false,
				adding: false,
				editing: false,
				deleting: false,
				success: true,
				failure: false,
				error: null,
			};
		case DELETING_PACKAGE_FAILURE:
			return {
				...state,
				fetching: false,
				adding: false,
				editing: false,
				deleting: false,
				success: false,
				failure: true,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default shipmentsReducer;
