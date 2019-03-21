import {
	GETTING_PRODUCTS,
	GETTING_PRODUCTS_SUCCESSFUL,
	GETTING_PRODUCTS_FAILURE,
	ADDING_PRODUCT,
	ADDING_PRODUCT_SUCCESSFUL,
	ADDING_PRODUCT_FAILURE,
	DELETING_PRODUCT,
	DELETING_PRODUCT_SUCCESSFUL,
	DELETING_PRODUCT_FAILURE,
	EDITTING_PRODUCT,
	EDITTING_PRODUCT_SUCCESSFUL,
	EDITTING_PRODUCT_FAILURE,
} from '../actions/productActions';

const initialState = {
	products: [],
	fetching: false,
	adding: false,
	editting: false,
	deleting: false,
	success: false,
	failure: false,
	error: null,
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETTING_PRODUCTS:
			return {
				...state,
				products: [],
				fetching: true,
				editting: false,
				deleting: false,
				success: false,
				failure: false,
				error: null,
			};
		case GETTING_PRODUCTS_SUCCESSFUL:
			return {
				...state,
				products: action.payload,
				fetching: false,
				editting: false,
				deleting: false,
				success: true,
				failure: false,
				error: null,
			};
		case GETTING_PRODUCTS_FAILURE:
			return {
				...state,
				fetching: false,
				editting: false,
				deleting: false,
				success: false,
				failure: true,
				error: action.payload,
			};

		case ADDING_PRODUCT:
			return {
				...state,
				fetching: false,
				adding: true,
				editting: false,
				deleting: false,
				success: false,
				failure: false,
				error: null,
			};
		case ADDING_PRODUCT_SUCCESSFUL:
			return {
				...state,
				products: action.payload,
				fetching: false,
				adding: false,
				editting: false,
				deleting: false,
				success: true,
				failure: false,
				error: null,
			};
		case ADDING_PRODUCT_FAILURE:
			return {
				...state,
				fetching: false,
				adding: false,
				editting: false,
				deleting: false,
				success: false,
				failure: true,
				error: action.payload,
			};

		case EDITTING_PRODUCT:
			return {
				...state,
				fetching: false,
				adding: false,
				editting: true,
				deleting: false,
				success: false,
				failure: false,
				error: null,
			};
		case EDITTING_PRODUCT_SUCCESSFUL:
			return {
				...state,
				products: action.payload,
				fetching: false,
				adding: false,
				editting: false,
				deleting: false,
				success: true,
				failure: false,
				error: null,
			};
		case EDITTING_PRODUCT_FAILURE:
			return {
				...state,
				fetching: false,
				adding: false,
				editting: false,
				deleting: false,
				success: false,
				failure: true,
				error: action.payload,
			};

		case DELETING_PRODUCT:
			return {
				...state,
				fetching: false,
				adding: false,
				editting: false,
				deleting: true,
				success: false,
				failure: false,
				error: null,
			};
		case DELETING_PRODUCT_SUCCESSFUL:
			return {
				...state,
				products: action.payload,
				fetching: false,
				adding: false,
				editting: false,
				deleting: false,
				success: true,
				failure: false,
				error: null,
			};
		case DELETING_PRODUCT_FAILURE:
			return {
				...state,
				fetching: false,
				adding: false,
				editting: false,
				deleting: false,
				success: false,
				failure: true,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default productReducer;
