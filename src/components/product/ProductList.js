import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Product from './Product';

class ProductList extends Component {
	render() {
		return (
			<div>
				{!this.props.products ? (
					<h5>...loading</h5>
				) : (
					this.props.products.map(product => {
						return (
							<div key={product.uuid}>
								<Product
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										flexDirection: 'column',
									}}
									editProduct={() =>
										this.props.editProduct(product.uuid, product)
									}
									handleChange={this.props.handleChange}
									trackingNumber={this.props.trackingNumber}
									deleteProduct={this.props.deleteProduct}
									addShipment={this.props.addShipment}
									key={product.identifier}
									product={product}
									name={this.props.name}
									productDescription={this.props.productDescription}
									weight={this.props.width}
									length={this.props.length}
									width={this.props.width}
									height={this.props.height}
									value={this.props.value}
								/>
							</div>
						);
					})
				)}
			</div>
		);
	}
}

export default withRouter(ProductList);
