import React, { Component } from 'react';
import { getAuth } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import ProductList from '../../components/product/ProductList';

class ProductListView extends Component {
	componentDidMount() {
		this.props.getAuth();
	}
	render() {
		return <ProductList />;
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.userReducer.isLoggedIn,
	};
};

export default connect(
	mapStateToProps,
	{ getAuth },
)(ProductListView);
