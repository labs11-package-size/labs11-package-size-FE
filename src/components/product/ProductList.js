import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Product from './Product';
import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/productActions';

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
	componentDidMount() {
		this.props.getProducts();
	}
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
						return <Product key={p.identifier} product={p} />;
					})
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		products: state.productReducer.products,
	};
};

export default connect(
	mapStateToProps,
	{
		getProducts,
	},
)(withStyles(styles)(ProductList));
