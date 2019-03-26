import axios from 'axios';

export const GETTING_PRODUCTS = 'GETTING_PRODUCTS';
export const GETTING_PRODUCTS_SUCCESSFUL = 'GETTING_PRODUCTS_SUCCESSFUL';
export const GETTING_PRODUCTS_FAILURE = 'GETTING_PRODUCTS_FAILURE';

export const ADDING_PRODUCT = 'ADDING_PRODUCT';
export const ADDING_PRODUCT_SUCCESSFUL = 'ADDING_PRODUCT_SUCCESSFUL';
export const ADDING_PRODUCT_FAILURE = 'ADDING_PRODUCT_FAILURE';

export const EDITING_PRODUCT = 'EDITING_PRODUCT';
export const EDITING_PRODUCT_SUCCESSFUL = 'EDITING_PRODUCT_SUCCESSFUL';
export const EDITING_PRODUCT_FAILURE = 'EDITING_PRODUCT_FAILURE';

export const DELETING_PRODUCT = 'DELETING_PRODUCT';
export const DELETING_PRODUCT_SUCCESSFUL = 'DELETING_PRODUCT_SUCCESSFUL';
export const DELETING_PRODUCT_FAILURE = 'DELETING_PRODUCT_FAILURE';

axios.defaults.baseURL = 'https://scannarserver.herokuapp.com/api';
axios.interceptors.request.use(
	function(options) {
		options.headers.authorization = localStorage.getItem('token');

		return options;
	},
	function(error) {
		return Promise.reject(error);
	},
);

export const getProducts = () => dispatch => {
	dispatch({ type: GETTING_PRODUCTS });

	axios
		.get('/products')
		.then(res =>
			dispatch({ type: GETTING_PRODUCTS_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: GETTING_PRODUCTS_FAILURE, payload: err.data }),
		);
};

export const addProduct = newProd => dispatch => {
	dispatch({ type: ADDING_PRODUCT });

	axios
		.post('/add', newProd)
		.then(res =>
			dispatch({ type: ADDING_PRODUCT_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: ADDING_PRODUCT_FAILURE, payload: err.data }),
		);
};
