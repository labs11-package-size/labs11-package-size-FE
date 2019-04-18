import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
import { addShipment, selectProduct, addPackage } from '../../store/actions/shipmentActions';
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
			SelectedProduct: [],
		};
	}

	componentWillMount = () => {
		this.props.getProducts();
	};

	handleSelectProduct = (product, event) => {
		event.stopPropagation();
		this.props.selectProduct(product);
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

	getThumbnail = imgs => {
		this.setState({
			product: {
				...this.state.product,
				thumbnail: imgs[0].secure_url,
			},
		});
	};

	addImgs = files => {
		this.setState({
			product: {
				...this.state.product,
				images: files.map(img => img.secure_url),
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
	updateState = product => {
		this.setState({ product: { ...this.state.product, product } });
	};

	render() {
		return (
			<div className={this.props.classes.mainContainer}>
				{this.props.products.length > 0 ? (
					<div>
						<ProductList
							updateState={this.updateState}
							selectProduct={this.handleSelectProduct}
							getThumbnail={this.getThumbnail}
							loadMore={this.props.getProducts}
							addImgs={this.addImgs}
							deleteImg={this.deleteImg}
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
							addPackage={this.addPackage}
						/>
					</div>
				) : (
					<div>
						<Typography gutterBottom variant="h5" component="h2">
							Products
						</Typography>
						<div className={this.props.classes.modalStyle}>
							<Paper className={this.props.classes.paper}>
								<Typography variant="h6">
									No Products yet.. Add a product to get started
								</Typography>
							</Paper>
							<div className={this.props.classes.modalStyle}>
								<AddProductModal
									addProduct={() => this.props.addProduct(this.state.product)}>
									<form className={this.props.classes.container}>
										<Input
											onChange={this.handleInputChange}
											name="name"
											value={this.state.product.name}
											placeholder="Product Name"
											className={this.props.classes.input}
										/>

										<Input
											onChange={this.handleInputChange}
											name="productDescription"
											value={this.state.product.productDescription}
											placeholder="Description"
											className={this.props.classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>

										<Input
											onChange={this.handleInputChange}
											name="height"
											value={this.state.product.height}
											placeholder="Height"
											className={this.props.classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>

										<Input
											onChange={this.handleInputChange}
											name="length"
											value={this.state.product.length}
											placeholder="Length"
											className={this.props.classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>
										<Input
											onChange={this.handleInputChange}
											name="value"
											value={this.state.product.value}
											placeholder="Value"
											className={this.props.classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>
										<Input
											onChange={this.handleInputChange}
											name="weight"
											value={this.state.product.weight}
											placeholder="Weight"
											className={this.props.classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>
										<Input
											onChange={this.handleInputChange}
											name="width"
											value={this.state.product.width}
											placeholder="Width"
											className={this.props.classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>
										<div className="uploader">
											<ImgUploader
												getThumbnail={this.getThumbnail}
												addImgs={this.addImgs}
												deleteImgFromProdList={this.deleteImg}
												thumbnail={this.state.thumbnail}
											/>
										</div>
									</form>
								</AddProductModal>
							</div>
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
		images: state.productsReducer.images,
	};
};

export default compose(
	withRouter(
		connect(
			mapStateToProps,
			{
				getProducts,
				addProduct,
				editProduct,
				deleteProduct,
				addShipment,
				selectProduct,
				addPackage
			},
		)(withStyles(styles)(ProductListView)),
	),
);
