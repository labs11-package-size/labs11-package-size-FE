import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { Redirect, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProducts, addProduct } from '../../store/actions/productActions';
import AddProductModal from '../modals/AddProductModal';
// import {useDropzone} from 'react-dropzone'
import Dropzone from 'react-dropzone';
import request from 'superagent';

import Product from './Product';

const CLOUDINARY_UPLOAD_PRESET = 'bmzjbxoq';
const CLOUDINARY_UPLOAD_URL =
	'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

const styles = theme => ({
	root: {
		width: 'auto',
		display: 'flex',
		flexWrap: 'wrap',
	},
	container: {
		margin: 40,
		flexDirection: 'column',
		display: 'flex',
	},
});

class ProductList extends Component {
	constructor() {
		super();
		this.onDrop = files => {
			this.setState({ files });
		};
		this.state = {
			files: [],
			uploadedFileCloudinaryUrl: '',
		};
	}

	handleImageUpload(file) {
		let upload = request
			.post(CLOUDINARY_UPLOAD_URL)
			.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
			.field('file', file);

		upload.end((err, response) => {
			if (err) {
				console.error(err);
			}

			if (response.body.secure_url !== '') {
				this.setState({
					uploadedFileCloudinaryUrl: response.body.secure_url,
				});
			}
		});
	}

	render() {
		const files = this.state.files.map(file => (
			<li key={file.name}>
				{file.name} - {file.size} bytes
			</li>
		));

		return (
			<div className={this.props.classes.container}>
				<Typography gutterBottom variant="h5" component="h2">
					Products
				</Typography>
				<div>
					<input
						placeholder="Search by name..."
						label="search"
						type="text"
						name="search"
						value={this.props.searchTerm}
						onChange={this.props.updateSearch}
					/>
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
							<Dropzone onDrop={this.onDrop} multiple={false} accept="image/*">
								{({ getRootProps, getInputProps }) => (
									<section className="container">
										<div {...getRootProps({ className: 'dropzone' })}>
											<input {...getInputProps()} />
											<p>
												Drag 'n' drop some files here, or click to select files
											</p>
										</div>
										{/* <div>
					{this.state.uploadedFileCloudinaryUrl === '' ? null : (
						<div>
							<p>{this.state.uploadedFile.name}</p>
							<img src={this.state.uploadedFileCloudinaryUrl} />
						</div>
					)}
				</div> */}
										<aside>
											<h4>Files</h4>
											<ul>{files}</ul>
										</aside>
									</section>
								)}
							</Dropzone>
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
const mapStateToProps = state => {
	return {
		products: state.productsReducer.products,
	};
};

export default compose(
	connect(
		mapStateToProps,
		{ getProducts, addProduct },
	)(withStyles(styles)(ProductList)),
);
