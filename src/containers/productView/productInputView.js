import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../store/actions/productActions';
import { getAuth } from '../../store/actions/userActions';

import ProductInput from '../../components/product/ProductInput';

class ProductInputView extends Component {
	state = {
		product: {
			name: '',
			productDescription: '',
			weight: '',
			length: '',
			width: '',
			height: '',
			fragile: false,
			value: '',
		},
		isEditing: false,
	};
	componentDidMount() {
		this.props.getAuth();
	}

	handleInputChange = event => {
		this.setState({
			product: {
				...this.state.product,
				[event.target.name]: event.target.value,
			},
		});
	};

	addProduct = () => {
		this.props.addProduct(this.state.product);
		this.setState({
			product: {
				name: '',
				productDescription: '',
				weight: '',
				length: '',
				width: '',
				height: '',
				fragile: false,
				value: '',
			},
		});
	};

	editProduct = event => {
		console.log('clicked');
		this.setState({
			isEditing: true,
		});
	};

	render() {
		console.log(this.state);
		return (
			<div>
				<ProductInput
					addProduct={this.addProduct}
					handleChange={this.handleInputChange}
					product={this.state.product}
					isEditing={this.state.isEditing}
				/>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return { success: state.productReducer.success };
};
export default connect(
	mapStateToProps,
	{ addProduct, getAuth },
)(ProductInputView);
