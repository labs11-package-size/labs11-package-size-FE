import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addProduct } from '../../store/actions/productActions';
import ProductAdd from '../../components/product/ProductAdd';

class ProductAddView extends Component {
	state = {
		product: {
			name: '',
			productDescription: '',
			weight: '',
			length: '',
			width: '',
			height: '',
			fragile: '',
			value: '',
		},
		currentProduct: '',
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
				value: '',
			},
		});
		this.props.history.push('/');
	};

	render() {
		return (
			<div>
				<ProductAdd
					addProduct={() => this.addProduct(this.state.product)}
					handleChange={this.handleInputChange}
					product={this.state.product}
				/>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return { success: state.productsReducer.success };
};
export default withRouter(
	connect(
		mapStateToProps,
		{ addProduct },
	)(ProductAddView),
);
