import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Product from './Product';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

const styles = {
	card: {
		maxWidth: 250,
		margin: 20,
	},
	media: {
		height: 140,
	},
	cardContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	mainContainer: {
		maxWidth: 1100,
	},
};

class ProductList extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<Typography gutterBottom variant="h5" component="h2">
					Products
				</Typography>
				{!this.props.products ? (
					<h5>...loading</h5>
				) : (
					this.props.products.map(p => {
						return (
							<Product
								editProduct={this.editProduct}
								uid={p.uid}
								key={p.identifier}
								product={p}
							/>
						);
					})
				)}
				<Link to="/products/form">
					<Button size="small">Add Product</Button>
				</Link>
			</div>
		);
	}
}

export default withStyles(styles)(ProductList);
