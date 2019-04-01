import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

import Product from './Product';

const styles = theme => ({
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
	submit: {
		marginTop: theme.spacing.unit * 3,
		backgroundColor: '#72BDA2',
		color: 'white',
		'&:hover': {
			color: '#72BDA2',
			backgroundColor: 'white',
			border: 'solid 5px #72BDA2',
		},
	},
});

class ProductList extends Component {
	productAdd = () => {
		return <Redirect to="/product/add" />;
	};
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
				<Button variant="contained" className={classes.submit} size="small">
					Add Product
				</Button>
			</div>
		);
	}
}

export default withStyles(styles)(ProductList);
