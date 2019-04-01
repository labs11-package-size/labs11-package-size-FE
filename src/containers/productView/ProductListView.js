import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductList from '../../components/product/ProductList';
import { getProducts } from '../../store/actions/productActions';

class ProductListView extends Component {
	componentDidMount() {
		this.props.getProducts();
	}
	render() {
		return (
			<ProductList
				delete={this.props.deleteProduct}
				products={this.props.products}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		products: state.productReducer.products,
	};
};

export default connect(
	mapStateToProps,
	{ getProducts },
)(ProductListView);
