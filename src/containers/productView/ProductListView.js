import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

import ProductList from '../../components/product/ProductList';
import {
	getProducts,
	addProduct,
	// editProduct,
	deleteProduct,
} from '../../store/actions/productActions';

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

class ProductListView extends Component {
	componentDidMount() {
		this.props.getProducts();
	}
	productAdd = () => {
		return <Redirect to="/product/add" />;
	};
	productDelete = id => {
		this.props.deleteProduct(id);
		return <Redirect to="/products" />;
	};
	// productEdit = (id, prod) => {
	// 	const updated = {}
	// 	return <Redirect to="/product/add" />;
	// };
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<Typography gutterBottom variant="h5" component="h2">
					Products
				</Typography>
				<ProductList
					editProduct={this.editProduct}
					deleteProduct={this.deleteProduct}
					products={this.props.products}
				/>
				<Button variant="contained" className={classes.submit} size="small">
					Add Product
				</Button>
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
	{ getProducts, addProduct, deleteProduct },
)(withStyles(styles)(ProductListView));
