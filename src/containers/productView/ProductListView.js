import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SearchInput, { createFilter } from 'react-search-input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Redirect, withRouter, Link } from 'react-router-dom';

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
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200,
			},
		},
	},
});

class ProductListView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			productDescription: '',
			weight: '',
			length: '',
			width: '',
			height: '',
			value: '',
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
				console.log(product);
			}
		});
		return filteredList;
	};

	render() {
		const KEYS_TO_FILTERS = ['product.name', 'product.description'];
		const filteredProducts = this.props.products.filter(
			createFilter(this.state.searchTerm, KEYS_TO_FILTERS),
		);

		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<Typography gutterBottom variant="h5" component="h2">
					Products
				</Typography>
				<div>
					<div>
						<SearchInput
							className="search-input"
							onChange={this.handleInputChange}
						/>
						<Button variant="contained" className={classes.submit} size="small">
							<Link to="/product/add">Add Product</Link>
						</Button>
					</div>
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

export default connect(
	null,
	{
		addProduct,
		editProduct,
		deleteProduct,
		addShipment,
	},
)(withStyles(styles)(ProductListView));
