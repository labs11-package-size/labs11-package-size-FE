import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect, withRouter } from 'react-router-dom';

import ProductList from '../../components/product/ProductList';
import {
	getProducts,
	addProduct,
	editProduct,
	deleteProduct,
} from '../../store/actions/productActions';
import { addShipment } from '../../store/actions/shipmentActions';

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
	state = {
		name: '',
		productDescription: '',
		weight: '',
		length: '',
		width: '',
		height: '',
		value: '',
		trackingNumber: '',
		products: this.props.products,
	};

	componentDidMount() {
		this.props.getProducts();
	}

	productAdd = prod => {
		this.props.addProduct(prod);
		return <Redirect to="/product/add" />;
	};

	addShipment = (tracId, prod) => {
		this.props.addShipment(tracId, prod);
		this.setState({
			trackingNumber: '',
		});
	};

	deleteProduct = id => {
		this.props.deleteProduct(id);
		return <Redirect to="/products" />;
	};

	editProduct = (id, prod) => {
		this.props.editProduct(id, prod);
		this.setState({
			name: '',
			productDescription: '',
			weight: '',
			length: '',
			width: '',
			height: '',
			value: '',
		});
	};

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

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
					addShipment={this.addShipment}
					products={this.props.products}
					handleChange={this.handleInputChange}
					trackingNumber={this.state.trackingNumber}
					name={this.state.name}
					productDescription={this.state.productDescription}
					weight={this.state.width}
					length={this.state.length}
					width={this.state.width}
					height={this.state.height}
					value={this.state.value}
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

export default withRouter(
	connect(
		mapStateToProps,
		{
			getProducts,
			addProduct,
			editProduct,
			deleteProduct,
			addShipment,
		},
	)(withStyles(styles)(ProductListView)),
);
