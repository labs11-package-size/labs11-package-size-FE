import React from 'react';

import Product from './Product';

const ProductList = props => {
	return (
		<div>
			{!props.products ? (
				<h5>...loading</h5>
			) : (
				props.products.map(p => {
					console.log(p.uuid);
					return (
						<Product
							// editProduct={props.editProduct(p.uuid, p)}
							deleteProduct={props => props.deleteProduct(p.uuid)}
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
