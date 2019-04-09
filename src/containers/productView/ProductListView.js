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
import { compose } from '../../../../../Library/Caches/typescript/3.4/node_modules/redux';

const styles = theme => ({
	mainContainer: {
		margin: '0 auto',
		maxWidth: 'auto',
	},
});

class ProductListView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			product: {
				name: '',
				productDescription: '',
				weight: '',
				length: '',
				width: '',
				height: '',
				value: '',
			},
			trackingNumber: '',
			searchTerm: '',
			filteredProductList: [],
			products: [],
		};
		this.searchUpdated = this.searchUpdated.bind(this);
	}

	componentDidMount() {
		return this.props.products;
	}

	searchUpdated(term) {
		this.setState({ searchTerm: term });
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
		this.props.history.push('/');
	};

	deleteProduct = id => {
		this.props.deleteProduct(id);
		return <Redirect to="/products" />;
	};

	editProduct = (id, prod) => {
		this.props.editProduct(id, prod);
		this.setState({
			product: {
				name: '',
				productDescription: '',
				weight: '',
				length: '',
				width: '',
				height: '',
				value: '',
			},
		});
		this.props.history.push('/');
	};

	handleInputChange = event => {
		this.setState({ product: {[event.target.name]: event.target.value }});
	};

	filterProducts = () => {
		const filteredList = this.props.products.map(product => {
			if (product === this.state.searchTerm) {
			}
		});
		return filteredList;
	};

	render() {
		return (
			<div className={this.props.classes.mainContainer}>
				<div>
					<ProductList
						editProduct={this.editProduct}
						deleteProduct={this.deleteProduct}
						addShipment={this.addShipment}
						products={
							this.props.products ? (
								this.props.products
							) : (
								<div>No Products yet</div>
							)
						}
						handleChange={this.handleInputChange}
						trackingNumber={this.state.trackingNumber}
						name={this.state.product.name}
						productDescription={this.state.product.productDescription}
						weight={this.state.product.width}
						length={this.state.product.length}
						width={this.state.product.width}
						height={this.state.product.height}
						value={this.state.product.value}
						product={this.state.product}
					/>
				</div>
			</div>
		);
	}
}

export default compose(
	withRouter(
		connect(
			null,
			{
				addProduct,
				editProduct,
				deleteProduct,
				addShipment,
			},
		)(withStyles(styles)(ProductListView)),
	),
);
