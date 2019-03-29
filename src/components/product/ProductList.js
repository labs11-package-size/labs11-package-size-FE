import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Product from './Product';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getProducts } from '../../store/actions/productActions';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

axios.defaults.baseURL = 'https://scannarserver.herokuapp.com/api';
axios.interceptors.request.use(
	function(options) {
		options.headers.authorization = localStorage.getItem('token');

		return options;
	},
	function(error) {
		return Promise.reject(error);
	},
);

class ProductList extends Component {
	state = {
		products: [],
	};

	componentDidMount() {
		axios
			.get('/products')
			.then(res => {
				this.setState({
					products: res.data,
				});
			})
			.catch(err => console.log(err));
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<Typography gutterBottom variant="h5" component="h2">
					Products
				</Typography>
				{!this.state.products ? (
					<h5>...loading</h5>
				) : (
					this.state.products.map(p => {
						return <Product key={p.identifier} product={p} />;
					})
				)}
				<Link to="/products/form">
					<Button size="small">Add Product</Button>
				</Link>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

export default connect(
	mapStateToProps,
	{
		getProducts,
	},
)(withStyles(styles)(ProductList));
