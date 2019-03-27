import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addProduct } from '../../store/actions/productActions';
import ProductInput from '../../components/product/ProductInput';

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

	addProduct = () => {
		this.props.addProduct(this.state.product);
	};

	// editProduct = () => {

	// }

	render() {
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
	return {
		shipments: state.shipmentReducer.shipments,
	};
};
export default connect(
	mapStateToProps,
	{ addProduct },
)(ProductInputView);
