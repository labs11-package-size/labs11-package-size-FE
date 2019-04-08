import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProducts } from '../../store/actions/productActions';

import Product from './Product';

const styles = theme => ({
	container: {
		margin: 40,
		width: 650,
		display: 'flex',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
});

class ProductList extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.container}>
				{this.props.products ? (
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
				) : (
					<div>no list yet</div>
				)}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		products: state.productsReducer.products,
	};
};

export default compose(
	connect(
		mapStateToProps,
		{ getProducts },
	)(withStyles(styles)(ProductList)),
);
