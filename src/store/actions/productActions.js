import axios from 'axios';
import superagent from 'superagent';
import sha1 from 'sha1';

export const DELETING_IMAGE = 'DELETING_IMAGE';
export const DELETING_IMAGE_SUCCESS = 'DELETING_IMAGE_SUCCESS';
export const DELETING_IMAGE_FAILURE = 'DELETING_IMAGE_FAILURE';

export const UPLOADING_IMAGE = 'UPLOADING_IMAGE';
export const UPLOADING_IMAGE_SUCCESS = 'UPLOADING_IMAGE_SUCCESS';
export const UPLOADING_IMAGE_FAILURE = 'UPLOADING_IMAGE_FAILURE';

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

export const GETTING_DETAIL = 'GETTING_DETAIL';
export const GETTING_DETAIL_SUCCESSFUL = 'GETTING_DETAIL_SUCCESSFUL';
export const GETTING_DETAIL_FAILURE = 'GETTING_DETAIL_FAILURE';

export const CLEAR_ADDING = 'CLEAR_ADDING';

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

const cloudName = 'dlrdfp08e';
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image`;

const timestamp = Date.now() / 1000;
const uploadPreset = 'hptnjfow';

const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}asrCpeXIyrttdOCMBw3lvJxwL0A`;

const signature = sha1(paramsStr);
const params = {
	api_key: '768737499725874',
	timestamp: timestamp,
	upload_preset: uploadPreset,
	signature: signature,
};

export const uploadImgs = files => dispatch => {
	dispatch({ type: UPLOADING_IMAGE });
	const image = files[0];

	let uploadRequest = superagent.post(`${url}/upload`);
	uploadRequest.attach('file', image);

	Object.keys(params).forEach(key => {
		uploadRequest.field(key, params[key]);
	});

	uploadRequest
		.then(res => {
			dispatch({ type: UPLOADING_IMAGE_SUCCESS, payload: res.body });
			console.log(`UPLOAD COMPLETE:${JSON.stringify(res.body)}`);
		})
		.catch(err => dispatch({ type: UPLOADING_IMAGE_FAILURE, payload: err }));
};

export const deleteImgFromProdList = id => dispatch => {
	dispatch({ type: DELETING_IMAGE, payload: id });
};

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
	console.log(newProd);
	dispatch({ type: ADDING_PRODUCT });
	axios
		.post('/products/add', newProd)
		.then(res =>
			dispatch({ type: ADDING_PRODUCT_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: ADDING_PRODUCT_FAILURE, payload: err.data }),
		);
};

export const editProduct = (uuid, product) => dispatch => {
	console.log(product);
	dispatch({ type: EDITING_PRODUCT });
	axios
		.put(`/products/edit/${uuid}`, product)
		.then(res =>
			dispatch({ type: EDITING_PRODUCT_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: EDITING_PRODUCT_FAILURE, payload: err.data }),
		);
};

export const deleteProduct = uuid => dispatch => {
	dispatch({ type: DELETING_PRODUCT });
	axios
		.delete(`/products/delete/${uuid}`)
		.then(res =>
			dispatch({ type: DELETING_PRODUCT_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: DELETING_PRODUCT_FAILURE, payload: err.data }),
		);
};

export const getDetail = (uuid, page) => dispatch => {
	dispatch({ type: GETTING_DETAIL });

	axios
		.get(`/products/getdetail/${uuid}?page=${page}`)
		.then(res =>
			dispatch({ type: GETTING_DETAIL_SUCCESSFUL, payload: res.data }),
		)
		.catch(err =>
			dispatch({ type: GETTING_DETAIL_FAILURE, payload: err.data }),
		);
};

export const ClearAdding = () => dispatch => {
	dispatch({ type: CLEAR_ADDING });
};
