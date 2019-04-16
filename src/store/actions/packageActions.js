import axios from 'axios';

export const GETTING_PACKAGES = 'GETTING_PACKAGES';
export const GETTING_PACKAGES_SUCCESSFUL = 'GETTING_PACKAGES_SUCCESSFUL';
export const GETTING_PACKAGES_FAILURE = 'GETTING_PACKAGES_FAILURE';

export const SELECTED_PRODUCT = 'SELECTED_PRODUCT';

export const ADDING_PACKAGE = 'ADDING_PACKAGE';
export const ADDING_PACKAGE_SUCCESSFUL = 'ADDING_PACKAGE_SUCCESSFUL';
export const ADDING_PACKAGE_FAILURE = 'ADDING_PACKAGE_FAILURE';

export const DELETING_PACKAGE = 'DELETING_PACKAGE';
export const DELETING_PACKAGE_SUCCESSFUL = 'DELETING_PACKAGE_SUCCESSFUL';
export const DELETING_PACKAGE_FAILURE = 'DELETING_PACKAGE_FAILURE';

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

export const getPackages = () => dispatch => {
	dispatch({ type: GETTING_PACKAGES });
	axios
		.get('/packaging')
		.then(res =>
			dispatch({ type: GETTING_PACKAGES_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: GETTING_PACKAGES_FAILURE, payload: err.data }),
		);
};

export const addPackage = packageArr => dispatch => {
	const products = { products: packageArr };
	console.log(products);
	dispatch({ type: ADDING_PACKAGE });
	axios
		.post('/packaging/preview', products)
		.then(res =>
			axios
				.post('/packaging/add', res.data)
				.then(res =>
					dispatch({ type: ADDING_PACKAGE_SUCCESSFUL, payload: res.data }),
				),
		)
		.catch(err =>
			dispatch({ type: ADDING_PACKAGE_FAILURE, payload: err.data }),
		);
};

export const deletePackage = uuid => dispatch => {
	dispatch({ type: DELETING_PACKAGE });
	axios
		.delete(`/packaging/delete/${uuid}`)
		.then(res =>
			dispatch({ type: DELETING_PACKAGE_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: DELETING_PACKAGE_FAILURE, payload: err.data }),
		);
};

// export const selectPackage = uuid => dispatch => {
// 	dispatch({ type: SELECTING_PACKAGE });
// 	axios
// 		.delete(`/packaging/delete/${uuid}`)
// 		.then(res =>
// 			dispatch({ type: SELECTING_PACKAGE_SUCCESSFUL, payload: res.data }),
// 		)
// 		.catch(err =>
// 			dispatch({ type: SELECTING_PACKAGE_FAILURE, payload: err.data }),
// 		);
// };
export const selectProduct = product => dispatch => {
	dispatch({ type: SELECTED_PRODUCT, payload: product });
};
