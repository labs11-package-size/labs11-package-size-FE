import React, { Component } from 'react';
import { getAuth } from '../../store/actions/userActions';
import { getProducts } from '../../store/actions/productActions';
import { connect } from 'react-redux';
import ProductList from '../../components/product/ProductList';

class ProductListView extends Component {
	componentDidMount() {
		this.props.getAuth();
		this.props.getProducts();
	}
	render() {
		return <ProductList products={this.props.products} />;
	}
}

const mapStateToProps = state => {
	return {
		products: state.productReducer.products,
	};
};

export default connect(
	mapStateToProps,
	{ getAuth, getProducts },
)(ProductListView);
