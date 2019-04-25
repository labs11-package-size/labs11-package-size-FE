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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import moment from 'moment-timezone';
import { Redirect, withRouter } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditProductModal from '../modals/EditProductModal';
import DeleteModal from './deleteModal';
import { Grid } from '@material-ui/core';

const timezone = moment.tz.guess();

function prevButtonStyles(page) {
	if (page === 1) {
		return {
			visibility: 'hidden',
		};
	} else {
		return {
			visibility: 'visible',
		};
	}
}

function nextButtonStyles(page, shipmentCount) {
	if (shipmentCount <= page * 3) {
		return {
			visibility: 'hidden',
		};
	} else {
		return {
			visibility: 'visible',
		};
	}
}

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
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
		width: '1000px',
		height: 'auto',
		backgroundColor: '#F2F3F4',
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
		[theme.breakpoints.down('sm')]: {
			width: '500px',
		},
	},
	pagebutton: {
		color: 'white',
		backgroundColor: '#72BDA2',
		'&:hover': {
			color: '#72BDA2',
			backgroundColor: 'white',
		},
		margin: '10px',
	},
	backbutton: {
		color: 'white',
		backgroundColor: '#72BDA2',
		'&:hover': {
			color: '#72BDA2',
			backgroundColor: 'white',
		},
		margin: '10px',
		width: '40%',
	},
	packit_submit: {
		width: '100%',
		color: 'white',
		backgroundColor: '#72BDA2',
		'&:hover': {
			color: '#72BDA2',
			backgroundColor: 'white',
		},
		margin: '10px',
	},
	shipmentTitle: {
		padding: '20px 0',
		width: '100%',
		height: '100%',
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	summaryCard: {
		// border: '1px black solid',
		padding: 10,
		width: '50%',
		height: '100%',
		// padding: '1%',
	},
	summaryCard2: {
		// border: '1px black solid',
		width: '50%',
		padding: 10,
		height: '100%',
		// padding: '1%',
	},
	prodSum: {
		textAlign: 'center',
	},
	descriptionAndDimensions: {
		height: '250px',
	},
	ProductDetailsRow: {
		padding: '15px 0 0 5px',
		fontSize: '12px',
	},
	individualShipment: {
		width: '30%',
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	ShipmentAccordionContainer: {
		display: 'none',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
	},
	ShipmentAccordionSubtext: {
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'block',
		},
	},
	shipmentContainer: {
		height: '200px',
	},
	outerShipmentContainer: {},
	AccordionSubheading: {
		fontSize: '12px',
		padding: 0,
	},
	AccordionHeading: {
		fontSize: '12px',
	},
	summarycontent: {
		minHeight: '0',
		margin: '7px 0',
		display: 'flex',
		justifyContent: 'space-between',
	},
	AccordionPanelSummary: {
		minHeight: '0',
	},
	summaryexpanded: {
		minHeight: '0',
	},
	rootsummary: {
		minHeight: '0',
	},
	expandIcon: {
		minHeight: '0',
	},
	AccordionDetails: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
});
function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class ProductDetailModal extends React.Component {
	state = {
		open: false,
		page: 1,
		dialogOpen: false,
		expanded: null,
	};

	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	};

	handleOpen = (event, uuid, page) => {
		event.stopPropagation();
		this.setState({ open: true });
		this.props.getDetail(uuid, page);
	};
	handleDialogOpen = () => {
		this.setState({ dialogOpen: true });
	};
	handleDialogClose = () => {
		this.setState({ dialogOpen: false });
	};

	previousPage = () => {
		this.setState(
			prevState => ({ page: --prevState.page }),
			() => this.props.getDetail(this.props.product.uuid, this.state.page),
		);
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
		const { expanded } = this.state;
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
							<Button
								className={classes.packit_submit}
								onClick={event => this.handleProductSelect(event)}>
								Add to Package List
							</Button>
						</CardActions>
					</Card>

					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						open={this.state.open}
						onClose={event => this.handleClose(event)}>
						<div style={getModalStyle()} className={classes.paper}>
							<div>
								<Typography
									variant="h6"
									id="modal-title"
									className={this.props.classes.prodSum}>
									Product Summary for {this.props.product.name}
								</Typography>
								<Grid
									container
									direction="row"
									justify="space-between"
									alignItems="center">
									<Grid
										container
										direction="row"
										justify="center"
										alignItems="center">
										<div aria-label="Pack It">
											<Tooltip title="Pack It">
												<Button
													variant="contained"
													className={classes.pagebutton}
													onClick={event =>
														this.handlePackit(event, this.props.product.uuid)
													}>
													Pack this item
												</Button>
											</Tooltip>
										</div>
										<div aria-label="edit" style={{ marginRight: '10px' }}>
											<EditProductModal
												onClick={event => this.handleLoad(event)}
												edit={() =>
													this.props.editProduct(
														this.props.product.uuid,
														this.props.updatedProduct,
													)
												}
												product={this.props.product}>
												<form
													className={classes.formContainer}
													autoComplete="off">
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
																<InputAdornment position="start">
																	$
																</InputAdornment>
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
																<InputAdornment position="end">
																	lb
																</InputAdornment>
															),
														}}
													/>
												</form>
											</EditProductModal>
										</div>
										<div aria-label="product details" />
										<div aria-label="delete">
											<DeleteModal
												delete={event =>
													this.props.deleteProduct(
														this.props.product.uuid,
														event,
													)
												}
											/>
										</div>
									</Grid>
								</Grid>
							</div>
							<div>
								{this.props.detail ? (
									<div>
										<Grid
											className={classes.descriptionAndDimensions}
											container
											alignItems="center"
											direction="row">
											<Card className={classes.summaryCard}>
												<Grid direction="column" flexWrap="wrap">
													<Typography>Description:</Typography>
													<Typography style={{ padding: '0 0 0 20px' }}>
														{this.props.detail.productDescription}
													</Typography>
												</Grid>
											</Card>
											<Card className={classes.summaryCard2}>
												<Grid
													container
													direction="column"
													alignItems="flex-start"
													padding="0 0 0 20px">
													<Typography className={classes.ProductDetailsRow}>
														Product Details
													</Typography>
													<Grid
														container
														style={{ width: '100%' }}
														justify="space-evenly">
														<Typography className={classes.ProductDetailsRow}>
															Length:
														</Typography>
														<Typography className={classes.ProductDetailsRow}>
															{this.props.detail.length}in.
														</Typography>
													</Grid>
													<Grid
														container
														style={{ width: '100%' }}
														justify="space-evenly">
														<Typography className={classes.ProductDetailsRow}>
															Width:
														</Typography>
														<Typography className={classes.ProductDetailsRow}>
															{this.props.detail.width}in.
														</Typography>
													</Grid>
													<Grid
														container
														style={{ width: '100%' }}
														justify="space-evenly">
														<Typography className={classes.ProductDetailsRow}>
															Height:
														</Typography>
														<Typography className={classes.ProductDetailsRow}>
															{this.props.detail.height}in.
														</Typography>
													</Grid>
													<Grid
														container
														style={{ width: '100%' }}
														justify="space-evenly">
														<Typography className={classes.ProductDetailsRow}>
															Price:
														</Typography>
														<Typography className={classes.ProductDetailsRow}>
															${this.props.detail.value}
														</Typography>
													</Grid>
													<Grid
														container
														style={{ width: '100%' }}
														justify="space-evenly">
														<Typography className={classes.ProductDetailsRow}>
															Weight:
														</Typography>
														<Typography className={classes.ProductDetailsRow}>
															{this.props.detail.weight}lbs
														</Typography>
													</Grid>
												</Grid>
											</Card>
										</Grid>
										<Card classname={classes.outershipmentContainer}>
											{!!this.props.detail.shipmentsCount &&
												this.props.detail.shipmentsCount !== 1 && (
													<Typography
														variant="h6"
														className={classes.shipmentTitle}>
														There are {this.props.detail.shipmentsCount} tracked
														shipments for this product.
													</Typography>
												)}
											{this.props.detail.shipmentsCount === 1 && (
												<Typography
													variant="h6"
													className={classes.shipmentTitle}>
													There is {this.props.detail.shipmentsCount} tracked
													shipment for this product.
												</Typography>
											)}

											<Grid
												className={this.props.classes.shipmentContainer}
												container
												justify="space-evenly"
												direction="row">
												{!!this.props.detail.shipmentsCount ? (
													this.props.detail.shipments.map((shipment, i) => {
														return (
															<Grid
																key={i}
																container
																direction="column"
																className={
																	this.props.classes.individualShipment
																}>
																<Typography className={classes.shipmentHeading}>
																	Date Shipped:{' '}
																	{moment
																		.tz(shipment.dateShipped, 'Pacific/Fiji')
																		.clone()
																		.tz(timezone)
																		.format('LL')}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Created On:{' '}
																	{moment
																		.tz(shipment.lastUpdated, 'Pacific/Fiji')
																		.clone()
																		.tz(timezone)
																		.format('LL h:mm a')}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Shipped To: {shipment.shippedTo}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Date Arrived:{' '}
																	{moment(shipment.dateArrived).format(
																		'LL h:mm a',
																	)}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Tracking Number: {shipment.trackingNumber}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Status: {parsedStatus(shipment)}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Carrier Name: {shipment.carrierName}
																</Typography>
															</Grid>
														);
													})
												) : (
													<Typography
														style={{ marginTop: '100px' }}
														className={classes.shipmentHeading}>
														There are no tracked shipments associated with this
														product.
													</Typography>
												)}
												{!!this.props.detail.shipmentsCount ? (
													this.props.detail.shipments.map(
														(shipment, index, array) => {
															let eventNumber = index;
															let panelNumber = index + 1;
															let panelString = `panel${panelNumber}`;
															return (
																<ExpansionPanel
																	className={classes.ShipmentAccordionContainer}
																	expanded={expanded === panelString}
																	onChange={this.handleChange(panelString)}>
																	<ExpansionPanelSummary
																		classes={{
																			expanded: classes.summaryexpanded,
																			content: classes.summarycontent,
																			root: classes.rootsummary,
																			expandIcon: classes.expandIcon,
																		}}
																		className={classes.AccordionPanelSummary}
																		expandIcon={<ExpandMoreIcon />}>
																		<Typography
																			className={classes.AccordionHeading}>
																			{moment
																				.tz(
																					shipment.lastUpdated,
																					'Pacific/Fiji',
																				)
																				.clone()
																				.tz(timezone)
																				.format('LL h:mm a')}
																		</Typography>
																		<Typography
																			className={classes.AccordionSubheading}>
																			Track #{shipment.trackingNumber}
																		</Typography>
																	</ExpansionPanelSummary>
																	<ExpansionPanelDetails
																		className={classes.AccordionDetails}>
																		<Typography
																			className={classes.AccordionShippedTo}>
																			Sent to {shipment.shippedTo}
																		</Typography>
																		<Typography
																			className={classes.AccordionShippedTo}>
																			Current status: {parsedStatus(shipment)}
																		</Typography>
																		{!!shipment.dateArrived && (
																			<Typography
																				className={
																					classes.AccordionDateArrived
																				}>
																				Arrived on {shipment.dateArrived}
																			</Typography>
																		)}
																	</ExpansionPanelDetails>
																</ExpansionPanel>
															);
														},
													)
												) : (
													<Typography
														style={{ marginTop: '100px' }}
														className={classes.ShipmentAccordionSubtext}>
														There are no tracked shipments associated with this
														product.
													</Typography>
												)}
											</Grid>
											<Grid container direction="row" justify="space-between">
												<Tooltip title="Previous 3 Shipments">
													<Button
														variant="contained"
														className={classes.pagebutton}
														style={prevButtonStyles(this.state.page)}
														onClick={() => this.previousPage()}>
														<Icon
															className={classNames(
																classes.icon,
																'fas fa-arrow-left',
															)}
														/>
													</Button>
												</Tooltip>
												<Tooltip title="Next 3 Shipments">
													<Button
														variant="contained"
														className={classes.pagebutton}
														style={nextButtonStyles(
															this.state.page,
															this.props.detail.shipmentsCount,
														)}
														onClick={() => this.nextPage()}>
														<Icon
															className={classNames(
																classes.icon,
																'fas fa-arrow-right',
															)}
														/>
													</Button>
												</Tooltip>
											</Grid>
										</Card>
									</div>
								) : null}
							</div>
							<div>
								<Tooltip title="Close">
									<Grid
										container
										direction="row"
										justify="space-evenly"
										alignItems="center">
										<Button
											variant="contained"
											className={classes.backbutton}
											onClick={event => this.handleClose(event)}>
											Back to list
										</Button>
									</Grid>
								</Tooltip>
								{this.props.children}
							</div>
						</div>
					</Modal>
				</div>
			</div>
		);
	}
}

const parsedStatus = n => {
	if (n.status === 0) {
		return 'Unknown';
	}
	if (n.status === 1) {
		return 'Shipping';
	}
	if (n.status === 2) {
		return 'En-Route';
	}
	if (n.status === 3) {
		return 'Out-For-Delivery';
	}
	if (n.status === 4) {
		return 'Delivered';
	}
	if (n.status === 5) {
		return 'Delayed';
	}
};

ProductDetailModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		detail: state.productsReducer.productDetail,
		selectedProducts: state.shipmentsReducer.selectedProducts,
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
