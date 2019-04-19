import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProducts, addProduct } from '../../store/actions/productActions';
import classNames from 'classnames';
import AddProductModal from '../modals/AddProductModal';
import ImgUploader from '../imgUploader/ImgUploader';


import Product from './Product';

const styles = theme => ({
	root: {
		width: 'auto',
		display: 'flex',
		flexWrap: 'wrap',
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
	searchContainer: {
		marginLeft: 'auto',
		marginRight: 'auto',
		maxWidth: 500,
	},
});

class ProductList extends Component {
	render() {
		return (
			<div className={this.props.classes.container}>
				<div className={this.props.classes.headingContainer}>
					<Typography gutterBottom variant="h5" component="h2">
						Products
					</Typography>

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
				<div>
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

					<div className={this.props.classes.root}>
						{this.props.products ? (
							this.props.products.map(product => {
								return (
									<div key={product.uuid}>
										<Product
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												flexDirection: 'column',
											}}
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
							<div>no list yet</div>
						)}
						<Button onClick={this.props.loadMore}>Load More</Button>
					</div>
					<div className={this.props.classes.root} />
				</div>
			</div>
		);
	}
}

export default compose(
	connect(
		null,
		{ getProducts, addProduct },
	)(withStyles(styles)(ProductList)),
);
