import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct, editProduct } from '../../store/actions/productActions';

import ProductEdit from '../../components/product/ProductEdit';

class ProductEditView extends Component {
	state = {
		product: {
			name: this.props.default.name,
			productDescription: this.props.default.productDescription,
			weight: this.props.default.weight,
			length: this.props.default.length,
			width: this.props.default.width,
			height: this.props.default.height,
			fragile: this.props.default.fragile,
			value: this.props.default.value,
		},
		currentProduct: this.props.productUuid,
		isEditing: false,
	};

	handleInputChange = event => {
		this.setState({
			product: {
				...this.state.product,
				[event.target.name]: event.target.defaultValue,
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
			isEditing: false,
		});
	};

	editProduct = () => {
		this.props.editProduct(this.state.currentProduct, this.state.product);
		this.setState({
			isEditing: false,
		});
	};

	render() {
		return (
			<div>
				<ProductEdit
					addProduct={this.addProduct}
					editProduct={this.editProduct}
					handleChange={this.handleInputChange}
					product={this.state.product}
					isEditing={this.state.isEditing}
				/>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return { success: state.productsReducer.success };
};
export default connect(
	mapStateToProps,
	{ addProduct, editProduct },
)(ProductEditView);
