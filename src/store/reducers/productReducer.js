import {
	GETTING_PRODUCTS,
	GETTING_PRODUCTS_SUCCESSFUL,
	GETTING_PRODUCTS_FAILURE,
	ADDING_PRODUCT,
	ADDING_PRODUCT_SUCCESSFUL,
	ADDING_PRODUCT_FAILURE,
	// DELETING_PRODUCT,
	// DELETING_PRODUCT_SUCCESSFUL,
	// DELETING_PRODUCT_FAILURE,
	EDITING_PRODUCT,
	EDITING_PRODUCT_SUCCESSFUL,
	EDITING_PRODUCT_FAILURE,
} from '../actions/productActions';

const initialState = {
	products: [],
	fetching: false,
	adding: false,
	editing: false,
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
				fetching: true,
				error: null,
			};
		case GETTING_PRODUCTS_SUCCESSFUL:
			return {
				...state,
				products: action.payload,
				fetching: false,
				editing: false,
				deleting: false,
				success: true,
				failure: false,
				error: null,
			};
		case GETTING_PRODUCTS_FAILURE:
			return {
				...state,
				fetching: false,
				editing: false,
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
				editing: false,
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
				editing: false,
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
				editing: false,
				deleting: false,
				success: false,
				failure: true,
				error: action.payload,
			};

		case EDITING_PRODUCT:
			return {
				...state,
				fetching: false,
				adding: false,
				editing: true,
				deleting: false,
				success: false,
				failure: false,
				error: null,
			};
		case EDITING_PRODUCT_SUCCESSFUL:
			return {
				...state,
				products: action.payload,
				fetching: false,
				adding: false,
				editing: false,
				deleting: false,
				success: true,
				failure: false,
				error: null,
			};
		case EDITING_PRODUCT_FAILURE:
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

		// case DELETING_PRODUCT:
		// 	return {
		// 		...state,
		// 		fetching: false,
		// 		adding: false,
		// 		editing: false,
		// 		deleting: true,
		// 		success: false,
		// 		failure: false,
		// 		error: null,
		// 	};
		// case DELETING_PRODUCT_SUCCESSFUL:
		// 	return {
		// 		...state,
		// 		products: action.payload,
		// 		fetching: false,
		// 		adding: false,
		// 		editing: false,
		// 		deleting: false,
		// 		success: true,
		// 		failure: false,
		// 		error: null,
		// 	};
		// case DELETING_PRODUCT_FAILURE:
		// 	return {
		// 		...state,
		// 		fetching: false,
		// 		adding: false,
		// 		editing: false,
		// 		deleting: false,
		// 		success: false,
		// 		failure: true,
		// 		error: action.payload,
		// 	};

		default:
			return state;
	}
};

export default productReducer;
