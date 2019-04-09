import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Redirect, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { getProducts } from '../../store/actions/productActions';

import Product from './Product';

const styles = theme => ({
	root: {
		width: 'auto',
		display: 'flex',
		flexWrap: 'wrap',
	},
	container: {
		margin: 40,
		flexDirection: 'column',
		display: 'flex',
	},
});

class ProductList extends Component {
	render() {
		return (
			<div className={this.props.classes.container}>
				<Typography gutterBottom variant="h5" component="h2">
					Products
				</Typography>
				<div>
					<input placeholder="search" label="search" type="text" />
					<Button
						variant="contained"
						className={this.props.classes.submit}
						size="small">
						<Link to="/product/add">Add Product</Link>
					</Button>
					<div className={this.props.classes.root}>
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
				</div>
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
