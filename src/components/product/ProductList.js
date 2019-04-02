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
							handleChange={props.handleChange}
							trackingNumber={props.trackingNumber}
							deleteProduct={props.deleteProduct}
							addShipment={props.addShipment}
							key={p.identifier}
							product={p}
							name={props.name}
							productDescription={props.productDescription}
							weight={props.width}
							length={props.length}
							width={props.width}
							height={props.height}
							value={props.value}
						/>
					);
				})
			)}
		</div>
	);
};

export default ProductList;
