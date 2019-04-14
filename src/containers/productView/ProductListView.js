import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import AddProductModal from '../../components/modals/AddProductModal';
import ImgUploader from '../../components/imgUploader/ImgUploader';

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
		marginTop: 30,
		maxWidth: 'auto',
	},
	container: {
		marginBottom: 60,
		flexDirection: 'column',
		display: 'flex',
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`,
	},
	heading: {
		padding: 10,
	},
	modalStyle: {
		marginTop: 10,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`,
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
				thumbnail: '',
				images: [],
			},
			trackingNumber: '',
			searchTerm: '',
		};
	}

	componentDidMount = () => {
		this.props.getProducts();
	};

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
				images: [],
			},
		});
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
				images: [],
			},
		});
		this.props.history.push('/');
	};

	deleteImg = imgId => {
		let updatedImages = Object.assign([], this.state.images);
		updatedImages.splice(imgId, 1);

		this.setState({
			product: {
				images: updatedImages,
			},
		});
	};

	getThumbnail = url => {
		this.setState({
			product: {
				...this.state.product,
				thumbnail: url,
			},
		});
	};

	addImgs = files => {
		this.setState({
			product: {
				...this.state.product,
				images: [...this.state.product.images, files.secure_url],
			},
		});
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
				{this.props.products.length > 0 ? (
					<div>
						<ProductList
							getThumbnail={this.getThumbnail}
							loadMore={this.props.getProducts}
							addImgs={this.addImgs}
							deleteImg={this.deleteImg}
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
							thumbnail={this.props.thumbnail}
							width={this.state.product.width}
							height={this.state.product.height}
							value={this.state.product.value}
							product={this.state.product}
							addProduct={this.productAdd}
							searchTerm={this.state.searchTerm}
							updateSearch={this.updateSearch}
						/>
					</div>
				) : (
					<div className={this.props.classes.modalStyle}>
						<Paper className={this.props.classes.paper}>
							<Typography variant="h6">
								No Products yet.. Add a product to get started
							</Typography>
						</Paper>
						<div className={this.props.classes.modalStyle}>
							<AddProductModal
								addProduct={() => this.props.addProduct(this.props.product)}>
								<form className={this.props.classes.container}>
									<Input
										onChange={this.props.handleChange}
										name="name"
										value={this.props.name}
										label={this.props.name}
										placeholder="Product Name"
										className={this.props.classes.input}
									/>

									<Input
										onChange={this.props.handleChange}
										name="productDescription"
										value={this.props.productDescription}
										label={this.props.productDescription}
										placeholder="Description"
										className={this.props.classes.input}
										inputProps={{
											'aria-label': 'Description',
										}}
									/>

									<Input
										onChange={this.props.handleChange}
										name="height"
										value={this.props.height}
										label={this.props.height}
										placeholder="Height"
										className={this.props.classes.input}
										inputProps={{
											'aria-label': 'Description',
										}}
									/>

									<Input
										onChange={this.props.handleChange}
										name="length"
										value={this.props.length}
										label={this.props.length}
										placeholder="Length"
										className={this.props.classes.input}
										inputProps={{
											'aria-label': 'Description',
										}}
									/>
									<Input
										onChange={this.props.handleChange}
										name="value"
										value={this.props.value}
										label={this.props.value}
										placeholder="Value"
										className={this.props.classes.input}
										inputProps={{
											'aria-label': 'Description',
										}}
									/>
									<Input
										onChange={this.props.handleChange}
										name="weight"
										value={this.props.weight}
										label={this.props.weight}
										placeholder="Weight"
										className={this.props.classes.input}
										inputProps={{
											'aria-label': 'Description',
										}}
									/>
									<Input
										onChange={this.props.handleChange}
										name="width"
										value={this.props.width}
										label={this.props.width}
										placeholder="Width"
										className={this.props.classes.input}
										inputProps={{
											'aria-label': 'Description',
										}}
									/>
									<div className="uploader">
										<ImgUploader
											getThumbnail={this.props.getThumbnail}
											addImgs={this.props.addImgs}
											deleteImgFromProdList={this.props.deleteImg}
											thumbnail={this.props.thumbnail}
										/>
									</div>
								</form>
							</AddProductModal>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		products: state.productsReducer.products,
		thumbnail: state.productsReducer.thumbnail,
	};
};

export default compose(
	withRouter(
		connect(
			mapStateToProps,
			{ getProducts, addProduct, editProduct, deleteProduct, addShipment },
		)(withStyles(styles)(ProductListView)),
	),
);
