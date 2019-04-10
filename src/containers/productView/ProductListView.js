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
import { compose } from 'redux';

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
		};
	}

	updateModalState = item => {
		this.setState({
			product: {
				name: item.name,
				productDescription: item.productDescription,
				weight: item.weight,
				value: item.value,
			},
		});
	};

	updateSearch = e => {
		this.setState({ searchTerm: e.target.value });
	};

	filteredProducts = () => {
		return this.props.products.filter(product => {
			return (
				product.name
					.toLowerCase()
					.indexOf(this.state.searchTerm.toLowerCase()) !== -1
			);
		});
	};

	productAdd = prod => {
		this.props.addProduct(prod);
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
				thumbnail: '',
			},
		});
		this.props.history.push('/');
	};
	addThumbnail = file => {
		console.log(file);
		const thumbnailUrl = file;
		this.setState(
			{
				product: {
					...this.state.product,
					thumbnail: thumbnailUrl,
				},
			},
			() => console.log('p list view state', this.state),
		);
	};

	handleInputChange = event => {
		this.setState({
			product: {
				...this.state.product,
				[event.target.name]: event.target.value,
			},
		});
	};

	render() {
		return (
			<div className={this.props.classes.mainContainer}>
				<div>
					<ProductList
						addThumbnail={this.addThumbnail}
						updateModalState={this.updateModalState}
						editProduct={this.editProduct}
						deleteProduct={this.deleteProduct}
						addShipment={this.addShipment}
						products={
							this.state.searchTerm
								? this.filteredProducts()
								: this.props.products
						}
						handleChange={this.handleInputChange}
						trackingNumber={this.state.trackingNumber}
						name={this.state.product.name}
						productDescription={this.state.product.productDescription}
						weight={this.state.product.weight}
						length={this.state.product.length}
						thumbnail={this.state.thumbnail}
						width={this.state.product.width}
						height={this.state.product.height}
						value={this.state.product.value}
						product={this.state.product}
						addProduct={this.productAdd}
						searchTerm={this.state.searchTerm}
						updateSearch={this.updateSearch}
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
