import React from 'react';
import ProductList from '../../components/product/ProductList';
// import Auth from '../../hoc/auth/Auth';

const ProductListView = props => {
	return <ProductList products={props.products} />;
};

export default ProductListView;
