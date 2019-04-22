import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Input from '@material-ui/core/Input';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
// import { flexbox } from "@material-ui/system";

import EditProductModal from '../modals/EditProductModal';
import DeleteModal from './deleteModal';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
		width: '70%',
	};
}

const styles = theme => ({
	card: {
		width: '210px',
	},
	container: {
		margin: '40px',
		width: 'auto',
		display: 'flex',
		cursor: 'pointer',
	},
	formContainer: {
		margin: '40px',
		width: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	dialogCustomizedWidth: {
		'max-width': '80%',
	},
	input: {
		margin: theme.spacing.unit,
	},
	media: {
		paddingTop: '56.25%',
		// width: 100,
	},
	actions: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	expand: {
		transform: 'rotate(0deg)',
		// marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: '#72BDA2',
	},
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 60,
		backgroundColor: '#F2F3F4',
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
	submit: {
		color: 'white',
		backgroundColor: '#72BDA2',
		'&:hover': {
			color: '#72BDA2',
			backgroundColor: 'white',
		},
	},
	summaryCard: {
		border: '1px black solid',
		padding: '1%',
	},
});

class ProductDetailModal extends React.Component {
	state = {
		open: false,
		page: 1,
	};

	handleOpen = (event, uuid, page) => {
		event.stopPropagation();
		this.setState({ open: true });
		this.props.getDetail(uuid, page);
	};

	nextPage = () => {
		this.setState(
			prevState => ({ page: ++prevState.page }),
			() => this.props.getDetail(this.props.product.uuid, this.state.page),
		);
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	handleLoad = event => {
		this.props.updateState(this.props.product);
	};

	handlePackit = (event, uuid) => {
		event.preventDefault();
		this.props.addPackage([uuid]);
		this.props.history.push('/loadingshipments');
	};

	handleProductSelect = event => {
		this.props.selectProduct(this.props.product, event);
		this.props.openDrawer();
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<div
					onClick={event => event.stopPropagation()}
					className={classes.root}>
					<Card
						onClick={event =>
							this.handleOpen(event, this.props.product.uuid, this.state.page)
						}
						className={classes.card}>
						<CardHeader
							style={{ whiteSpace: 'nowrap' }}
							subheader={
								this.props.product.name.length > 24
									? `${this.props.product.name.slice(0, 24)}...`
									: this.props.product.name
							}
						/>

						<CardMedia
							className={classes.media}
							id={this.props.product.uuid}
							// style={{ width: 100 }}
							image={this.props.product.thumbnail}
							alt="product"
						/>

						<CardActions className={classes.actions} disableActionSpacing>
							<div aria-label="add">
								<Tooltip title="Pack It">
									<Button onClick={event => this.handleProductSelect(event)}>
										<Icon
											className={classNames(
												classes.icon,
												'fas fa-clipboard-check',
											)}
										/>
									</Button>
								</Tooltip>
							</div>
							<div aria-label="edit">
								<EditProductModal
									onClick={event => this.handleLoad(event)}
									edit={() =>
										this.props.editProduct(
											this.props.product.uuid,
											this.props.updatedProduct,
										)
									}
									product={this.props.product}>
									<form className={classes.formContainer} autoComplete="off">
										<TextField
											required
											id="standard-name"
											name="name"
											label="Product Name"
											className={this.props.classes.textField}
											value={this.props.updatedProduct.name}
											onChange={this.props.handleChange}
											margin="normal"
										/>

										<TextField
											onChange={this.props.handleChange}
											name="productDescription"
											value={this.props.updatedProduct.productDescription}
											label="Description"
											className={this.props.classes.textField}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>

										<TextField
											onChange={this.props.handleChange}
											name="value"
											value={this.props.updatedProduct.value}
											label="Value"
											className={this.props.classes.textField}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">$</InputAdornment>
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
											value={this.props.updatedProduct.weight}
											label="Weight"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">lb</InputAdornment>
												),
											}}
										/>
									</form>
								</EditProductModal>
							</div>
							<div aria-label="product details" />
						</CardActions>
					</Card>

					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						open={this.state.open}
						onClose={event => this.handleClose(event)}>
						<div style={getModalStyle()} className={classes.paper}>
							<div>
								<Typography variant="h6" id="modal-title">
									{this.props.product.name}
								</Typography>
							</div>
							<div aria-label="Pack It">
								<Tooltip title="Pack It">
									<Button
										variant="contained"
										className={classes.submit}
										onClick={event =>
											this.handlePackit(event, this.props.product.uuid)
										}>
										Pack It
									</Button>
								</Tooltip>
							</div>
							<div aria-label="delete">
								<DeleteModal
									delete={event =>
										this.props.deleteProduct(this.props.product.uuid, event)
									}
								/>
							</div>
							<div>
								{this.props.detail ? (
									<div>
										<Card className={this.props.classes.summaryCard}>
											<div className={this.props.classes.root}>
												<Typography variant="h6" id="modal-title">
													Product Summary:
												</Typography>
												<Typography>
													Description: {this.props.detail.productDescription}
												</Typography>
												<Typography className={classes.heading}>
													Price: ${this.props.detail.value}
												</Typography>
												<Typography className={classes.heading}>
													Fragile: {this.props.detail.fragile}
												</Typography>
											</div>
										</Card>
										<Card className={this.props.classes.summaryCard}>
											<div className={this.props.classes.root}>
												<Typography className={classes.heading}>
													Product Dimensions:
												</Typography>
												<Typography className={classes.heading}>
													Length: {this.props.detail.length}"
												</Typography>
												<Typography className={classes.heading}>
													Width: {this.props.detail.width}"
												</Typography>
												<Typography className={classes.heading}>
													Height: {this.props.detail.height}"
												</Typography>
											</div>
										</Card>
										<Card>
											<div
												className={this.props.classes.root}
												className={this.props.classes.summaryCard}>
												<Typography className={classes.heading}>
													Shipment Summary:
												</Typography>
												<div className={this.props.classes.summaryCard}>
													{this.props.detail.shipments ? (
														this.props.detail.shipments.map((shipment, i) => {
															return (
																<div key={i}>
																	<Typography className={classes.heading}>
																		Date Shipped: {shipment.dateShipped}
																	</Typography>
																	<Typography className={classes.heading}>
																		Last Updated: {shipment.lastUpdated}
																	</Typography>
																	<Typography className={classes.heading}>
																		Shipped To: {shipment.shippedTo}
																	</Typography>
																	<Typography className={classes.heading}>
																		Date Arrived: {shipment.dateArrived}
																	</Typography>
																	<Typography className={classes.heading}>
																		Tracking Number: {shipment.trackingNumber}
																	</Typography>
																	<Typography className={classes.heading}>
																		Status: {shipment.status}
																	</Typography>
																	<Typography className={classes.heading}>
																		Carrier Name: {shipment.carrierName}
																	</Typography>
																</div>
															);
														})
													) : (
														<div>
															There are no shipments associated with this
															product.
														</div>
													)}
												</div>
											</div>
										</Card>
									</div>
								) : null}
							</div>
							<div>
								<Tooltip title="Close">
									<Button
										variant="contained"
										className={classes.submit}
										onClick={event => this.handleClose(event)}>
										Close
									</Button>
								</Tooltip>
								{this.props.children}
								<Tooltip title="Next Shipment">
									<Button
										variant="contained"
										className={classes.submit}
										onClick={() => this.nextPage()}>
										Next Page
									</Button>
								</Tooltip>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		);
	}
}

ProductDetailModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		detail: state.productsReducer.productDetail,
	};
};
export default compose(
	withRouter(
		connect(
			mapStateToProps,
			{},
		)(withStyles(styles)(ProductDetailModal)),
	),
);
