import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Tooltip from '@material-ui/core/Tooltip';
import { getProducts, addProduct, getDetail } from '../../store/actions/productActions';
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
	container: {
		marginBottom: 60,
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
						<form className={this.props.classes.container}>
							<Input
								onChange={this.props.handleChange}
								name="name"
								value={this.props.product.name}
								placeholder="Product Name"
								className={this.props.classes.input}
							/>

							<Input
								onChange={this.props.handleChange}
								name="productDescription"
								value={this.props.product.productDescription}
								placeholder="Description"
								className={this.props.classes.input}
								inputProps={{
									'aria-label': 'Description',
								}}
							/>

							<Input
								onChange={this.props.handleChange}
								name="height"
								value={this.props.product.height}
								placeholder="Height"
								className={this.props.classes.input}
								inputProps={{
									'aria-label': 'Description',
								}}
							/>

							<Input
								onChange={this.props.handleChange}
								name="length"
								value={this.props.product.length}
								placeholder="Length"
								className={this.props.classes.input}
								inputProps={{
									'aria-label': 'Description',
								}}
							/>
							<Input
								onChange={this.props.handleChange}
								name="value"
								value={this.props.product.value}
								placeholder="Value"
								className={this.props.classes.input}
								inputProps={{
									'aria-label': 'Description',
								}}
							/>
							<Input
								onChange={this.props.handleChange}
								name="weight"
								value={this.props.product.weight}
								placeholder="Weight"
								className={this.props.classes.input}
								inputProps={{
									'aria-label': 'Description',
								}}
							/>
							<Input
								onChange={this.props.handleChange}
								name="width"
								value={this.props.product.width}
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
				<div>
					<div className={this.props.classes.searchContainer}>
						<TextField
							name="search"
							value={this.props.searchTerm}
							onChange={this.props.updateSearch}
							id="filled-full-width"
							placeholder="Search by name..."
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
											updateState={this.props.updateModalState}
											deleteProduct={this.props.deleteProduct}
											addShipment={this.props.addShipment}
											key={product.identifier}
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
										/>
									</div>
								);
							})
						) : (
							<div>no list yet</div>
						)}
						<Button onClick={this.props.loadMore}>Load More</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default compose(
	connect(
		null,
		{ getProducts, addProduct, getDetail },
	)(withStyles(styles)(ProductList)),
);
