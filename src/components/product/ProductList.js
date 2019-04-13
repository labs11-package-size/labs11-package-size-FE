import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { Redirect, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProducts, addProduct } from '../../store/actions/productActions';
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
		margin: 40,
		flexDirection: 'column',
		display: 'flex',
	},
	headingContainer: {
		margin: 40,
		justifyContent: 'space-between',
		alignItems: 'baseline',
		display: 'flex',
	},
	searchContainer: {
		margin: '0 auto',
		maxWidth: 800,
	},
});

class ProductList extends Component {
	render() {
		return (
			<div className={this.props.classes.container}>
				<div className={this.props.classes.headingContainer}>
					<Typography gutterBottom variant="h5">
						Products
					</Typography>
					<AddProductModal>
						<form className={this.props.classes.container}>
							<Input
								onChange={this.props.handleChange}
								name="name"
								value={this.props.name}
								label={this.props.name}
								placeholder="Product Name"
								className={this.props.classes.input}
								inputProps={{
									'aria-label': 'Description',
								}}
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
									addThumbnail={this.props.addThumbnail}
									thumbnail={this.props.thumbnail}
								/>
							</div>
							<div onClick={() => this.props.addProduct(this.props.product)}>
								<Button
									variant="contained"
									className={this.props.classes.submit}
									size="small">
									Add Product
								</Button>
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
										/>
									</div>
								);
							})
						) : (
							<div>no list yet</div>
						)}
					</div>
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
