import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProducts, addProduct } from '../../store/actions/productActions';
import classNames from 'classnames';
import AddProductModal from '../modals/AddProductModal';
import ImgUploader from '../imgUploader/ImgUploader';
import { deleteSelectedProduct } from '../../store/actions/shipmentActions';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';

import Product from './Product';

const styles = theme => ({
	root: {
		width: 'auto',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
	},
	shipit_btn: {
		margin: '0 auto',
		width: '100%',
		backgroundColor: '#72BDA2',
		color: 'white',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	dimensions: {
		flexBasis: 200,
	},
	margin: {
		margin: theme.spacing.unit,
	},
	drawer: {
		height: '100vh',
		paddingTop: theme.spacing.unit * 3,
		width: '30%',
		flexShrink: 0,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaper: {
		marginTop: 20,
		paddingTop: '45px',
		width: '20%',
		minWidth: 250,
		transitionDuration: { enter: 1000, exit: 1000 },
	},
	content: {
		// flexGrow: 1,
		// padding: theme.spacing.unit * 3,
		// transition: theme.transitions.create('margin', {
		// 	easing: theme.transitions.easing.sharp,
		// 	duration: theme.transitions.duration.leavingScreen,
		// }),
		// margin: 'auto',
	},
	contentShift: {
		// marginRight: 320,
		width: '81%',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
	},
	container: {
		marginBottom: 25,
		flexDirection: 'column',
		display: 'flex',
	},
	headingContainer: {
		justifyContent: 'space-between',
		alignItems: 'baseline',
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
	searchContainer: {
		marginLeft: 'auto',
		marginBottom: 40,
		marginRight: 'auto',
		display: 'flex',
		justifyContent: 'center',
		maxWidth: '50%',
	},
});

class ProductList extends Component {
	state = {
		open: true,
	};

	handleDeleteSelected = uuid => {
		this.props.deleteSelectedProduct(uuid);
	};

	handleDrawerOpen = () => {
		return;
	};
	handlePackit = () => {
		const list = this.props.selectedProducts.map(prod => prod.uuid);
		this.props.addPackage(list);
		this.props.history.push('/loadingshipments');
	};

	handleRenderList = () => {
		if (this.props.selectedProducts.length >= 1) {
			return (
				<Drawer
					className={this.props.classes.drawer}
					variant="persistent"
					classes={{
						paper: this.props.classes.drawerPaper,
					}}
					anchor="right"
					open={true}>
					<Divider />
					<Paper>
						<List>
							<Typography
								className={this.props.classes.searchContainer}
								gutterBottom
								variant="h5"
								component="h2">
								Package List
							</Typography>
							{this.props.selectedProducts.map((prod, i) => (
								<ListItem key={i}>
									<Checkbox
										style={{ color: '#72BDA2' }}
										checked={true}
										onClick={() => this.handleDeleteSelected(prod.uuid)}
										indeterminate
									/>
									<ListItemText primary={prod.name} />
								</ListItem>
							))}
						</List>
						<Divider />
						<Button
							className={this.props.classes.shipit_btn}
							onClick={this.handlePackit}>
							Pack It
						</Button>
					</Paper>
				</Drawer>
			);
		} else {
			return null;
		}
	};

	render() {
		return (
			<div className={this.props.classes.container}>
				<div className={this.props.classes.headingContainer}>
					{this.props.selectedProducts.length >= 1 ? (
						<div>
							<Typography gutterBottom variant="h5" component="h2">
								PACKING MULTIPLE PRODUCTS
							</Typography>
							{/* <Button
								className={this.props.classes.shipit_btn}
								onClick={this.handlePackit}>
								Pack It
							</Button> */}
						</div>
					) : (
						<Typography gutterBottom variant="h5" component="h2">
							Products
						</Typography>
					)}
					<AddProductModal
						getThumbnail={this.getThumbnail}
						addImgs={this.addImgs}
						addProduct={() => this.props.addProduct(this.props.product)}>
						<form className={this.props.classes.container} autocomplete="off">
							<div className={this.props.classes.container}>
								<Typography gutterBottom variant="h5" component="h2">
									Product Detail
								</Typography>
								<TextField
									required
									id="standard-name"
									name="name"
									label="Product Name"
									className={this.props.classes.textField}
									value={this.props.product.name}
									onChange={this.props.handleChange}
									margin="normal"
								/>
								<TextField
									onChange={this.props.handleChange}
									name="productDescription"
									value={this.props.product.productDescription}
									label="Description"
									className={this.props.classes.textField}
									inputProps={{
										'aria-label': 'Description',
									}}
								/>
								<TextField
									onChange={this.props.handleChange}
									name="value"
									value={this.props.product.value}
									label="Value"
									className={this.props.classes.textField}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">$</InputAdornment>
										),
									}}
								/>
							</div>
							<div className={this.props.classes.container}>
								<Typography gutterBottom variant="h5" component="h2">
									Dimensions
								</Typography>
								<TextField
									onChange={this.props.handleChange}
									name="height"
									value={this.props.product.height}
									label="Height"
									className={classNames(
										this.props.classes.margin,
										this.props.classes.textField,
									)}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">in</InputAdornment>
										),
									}}
								/>

								<TextField
									onChange={this.props.handleChange}
									name="length"
									value={this.props.product.length}
									label="Length"
									className={classNames(
										this.props.classes.margin,
										this.props.classes.textField,
									)}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">in</InputAdornment>
										),
									}}
								/>

								<TextField
									onChange={this.props.handleChange}
									name="width"
									value={this.props.product.width}
									label="Width"
									className={classNames(
										this.props.classes.margin,
										this.props.classes.textField,
									)}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">in</InputAdornment>
										),
									}}
								/>
								<TextField
									className={classNames(
										this.props.classes.margin,
										this.props.classes.textField,
									)}
									onChange={this.props.handleChange}
									name="weight"
									value={this.props.product.weight}
									label="Weight"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">lb</InputAdornment>
										),
									}}
								/>
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

				<div
					className={
						this.props.selectedProducts.length >= 1 &&
						this.props.classes.contentShift
					}>
					<div className={this.props.classes.drawerHeader} />

					<div>
						{this.props.products.length >= 1 && (
							<div className={this.props.classes.searchContainer}>
								<TextField
									name="search"
									value={this.props.searchTerm}
									onChange={this.props.updateSearch}
									id="filled-full-width"
									label="Search by name..."
									margin="normal"
									fullWidth
									variant="filled"
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</div>
						)}

						<div className={this.props.classes.root}>
							{this.props.products.length >= 1 ? (
								this.props.products.map(product => {
									return (
										<div key={product.uuid}>
											<Product
												openDrawer={this.handleDrawerOpen}
												selectProduct={this.props.selectProduct}
												editProduct={this.props.editProduct}
												handleChange={this.props.handleChange}
												trackingNumber={this.props.trackingNumber}
												deleteProduct={this.props.deleteProduct}
												updateState={this.props.updateState}
												addShipment={this.props.addShipment}
												product={product}
												updatedProduct={this.props.product}
												name={this.props.name}
												productDescription={this.props.productDescription}
												weight={this.props.width}
												thumbnail={this.props.thumbnail}
												length={this.props.length}
												width={this.props.width}
												height={this.props.height}
												value={this.props.value}
												getDetail={this.props.getDetail}
												addPackage={this.props.addPackage}
											/>
										</div>
									);
								})
							) : (
								<div style={{ margin: '0 auto' }}>
									<Paper className={this.props.classes.paper}>
										<Typography variant="h6">
											No Products yet... Create a new product to get started
										</Typography>
									</Paper>
								</div>
							)}
						</div>
					</div>
				</div>

				{this.handleRenderList()}
			</div>
		);
	}
}

export default compose(
	withRouter(
		connect(
			null,
			{ getProducts, addProduct, deleteSelectedProduct },
		)(withStyles(styles)(ProductList)),
	),
);
