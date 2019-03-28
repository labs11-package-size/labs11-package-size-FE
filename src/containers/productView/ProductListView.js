import React from 'react';
import ProductList from '../../components/product/ProductList';

const ProductListView = props => {
	return <ProductList user={props.user} />;
};

export default ProductListView;
