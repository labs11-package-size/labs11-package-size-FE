import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ProductInput from '../../components/product/ProductInput';

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

class ProductInputView extends Component {
	state = {
		product: {
			name: '',
			description: '',
			weight: '',
			length: '',
			width: '',
			height: '',
			fragile: null,
			value: '',
		},
		isEditing: false,
	};

	handleInputChange = event => {
		this.setState({
			product: {
				...this.state.product,
				[event.target.name]: event.target.value,
			},
		});
	};

	// addProduct = () => {
	// 	axios
	// 		.post('/products/add', this.state.product)
	// 		.then(res => {

	// 			this.setState({
	// 				product: {
	// 					name: '',
	// 					description: '',
	// 					weight: '',
	// 					length: '',
	// 					width: '',
	// 					height: '',
	// 					fragile: null,
	// 					value: '',
	// 				},
	// 			});
	// 		})
	// 		.catch(err => console.log(err));
	// };

	editProduct = event => {
		console.log('clicked');
		this.setState({
			isEditing: true,
		});
	};

	handleEditSubmit = event => {
		console.log('clicked', event.target);
		// axios
		// .put(`/products/add${this.state.product}`, this.state.product)
		// .then(res => {
		// 	console.log(res.data);
		// })
		// .catch(err => console.log(err));
	};

	render() {
		return (
			<div>
				<ProductInput
					user={this.props.user}
					addProduct={this.addProduct}
					handleChange={this.handleInputChange}
					handleEditSubmit={this.handleEditSubmit}
					product={this.state.product}
					isEditing={this.state.isEditing}
				/>
			</div>
		);
	}
}

export default ProductInputView;
