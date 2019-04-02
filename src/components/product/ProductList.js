import React from 'react';

import Product from './Product';

const ProductList = props => {
	return (
		<div>
			{!props.products ? (
				<h5>...loading</h5>
			) : (
				props.products.map(p => {
					return (
						<Product
							// editProduct={props.editProduct(p.uuid, p)}
							deleteProduct={props.deleteProduct}
							key={p.identifier}
							product={p}
						/>
					);
				})
			)}
		</div>
	);
};

export default ProductList;
