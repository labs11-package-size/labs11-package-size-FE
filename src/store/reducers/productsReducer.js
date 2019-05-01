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
	EDITING_PRODUCT,
	EDITING_PRODUCT_SUCCESSFUL,
	EDITING_PRODUCT_FAILURE,
	UPLOADING_IMAGE,
	UPLOADING_IMAGE_SUCCESS,
	UPLOADING_IMAGE_FAILURE,
	DELETING_IMAGE,
	GETTING_DETAIL,
	GETTING_DETAIL_SUCCESSFUL,
	GETTING_DETAIL_FAILURE,
	CLEAR_ADDING
} from '../actions/productActions';

const initialState = {
	products: [],
	images: [],
	productDetail: null,
	thumbnail: '',
	fetching: false,
	adding: false,
	editing: false,
	deleting: false,
	success: false,
	failure: false,
	error: null,
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETTING_PRODUCTS:
			return {
				...state,
				fetching: true,
				error: null,
			};
		case DELETING_IMAGE:
			return {
				...state,
				images: state.images.filter(image => {
					console.log(image);
					return image.public_id !== action.payload;
				}),
				fetching: true,
				error: null,
			};
		case GETTING_PRODUCTS_SUCCESSFUL:
			return {
				...state,
				images: [],
				products: action.payload,
				fetching: false,
				success: true,
				error: null,
			};

		case GETTING_PRODUCTS_FAILURE:
			return {
				...state,
				fetching: false,
				success: false,
				failure: true,
				error: action.payload,
			};

		case UPLOADING_IMAGE:
			return {
				...state,
				adding: true,
				failure: false,
				error: null,
			};
		case UPLOADING_IMAGE_SUCCESS:
		console.log("upload image success payload", action.payload)
			return {
				...state,
				images: [...state.images, action.payload],
				fetching: false,
				adding: false,
				success: true,
				failure: false,
				error: null,
			};
		case UPLOADING_IMAGE_FAILURE:
			return {
				...state,
				fetching: false,
				success: false,
				failure: true,
				error: action.payload,
			};
		case ADDING_PRODUCT:
			return {
				...state,
				adding: true,
				failure: false,
				error: null,
			};
		case ADDING_PRODUCT_SUCCESSFUL:
			return {
				...state,
				products: action.payload,
				images: [],
				fetching: false,
				adding: false,
				success: true,
				failure: false,
				error: null,
			};
		case ADDING_PRODUCT_FAILURE:
			return {
				...state,
				fetching: false,
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
				images: [],
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

		case DELETING_PRODUCT:
			return {
				...state,
				fetching: false,
				adding: false,
				editing: false,
				deleting: true,
				success: false,
				failure: false,
				error: null,
			};
		case DELETING_PRODUCT_SUCCESSFUL:
			return {
				...state,
				images: [],
				products: action.payload,
				fetching: false,
				adding: false,
				editing: false,
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
				editing: false,
				deleting: false,
				success: false,
				failure: true,
				error: action.payload,
			};
		case GETTING_DETAIL:
			return {
				...state,
				fetching: true,
				error: null,
			};
		case GETTING_DETAIL_SUCCESSFUL:
			return {
				...state,
				productDetail: action.payload,
				fetching: false,
				success: true,
				error: null,
			};
		case GETTING_DETAIL_FAILURE:
			return {
				...state,
				fetching: false,
				success: false,
				failure: true,
				error: action.payload,
			};
			case CLEAR_ADDING:
			return {
				...state,
				images: [],
				thumbnail: ""
			}
		default:
			return state;
	}
};

export default productsReducer;
