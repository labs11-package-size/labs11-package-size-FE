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
import { Grid } from '@material-ui/core';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
		width: '1000px',
		height: '700px',
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
	icon: {
		color: 'white',
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
    margin: "10px",
  },
  summaryCard: {
    // border: '1px black solid',
    width: '50%',
    height: '100%',
    // padding: '1%',
  },
  summaryCard2: {
    // border: '1px black solid',
    width: '50%',
    height: '100%',
    // padding: '1%',
  },
  prodSum: {
    textAlign: 'center',
  },
  descriptionAndDimensions: {
    height: "250px"
  },
  heading: {
    padding: "15px 0 0 5px",
		fontSize: "1.2em",
		
  },
  individualShipment: {
    width: "30%",
  }
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
								<Tooltip title="Add To Packing List">
									<Button
										style={{ backgroundColor: '#72BDA2' }}
										onClick={event => this.handleProductSelect(event)}>
										<Icon className={classNames(classes.icon, 'fas fa-plus')} />
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
							<Typography variant="h6" id="modal-title" className={this.props.classes.prodSum}>
								Product Summary
							</Typography>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <div aria-label="Pack It">
                  <Tooltip title="Pack It">
                    <Button
                      variant="contained"
                      className={classes.submit}
                      onClick={event => this.handlePackit(event, this.props.product.uuid)}
                      >
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
              </Grid>
								<Typography variant="h6" id="modal-title">
									{this.props.product.name}
								</Typography>
              </Grid>
              </div>
              <div>
							{this.props.detail ? 
								<div>
									<Grid
										className={this.props.classes.descriptionAndDimensions}
										container
										alignItems="center"
										direction="row"
									>
										<Card className={this.props.classes.summaryCard}>  
											<Grid direction="column" flexWrap="wrap">
											<Typography className={classes.heading}>
												Description:
											</Typography>
											<Typography padding="0 0 0 20px">
												{this.props.detail.productDescription}
											</Typography>
											<Typography className={classes.heading}>
												Price: ${this.props.detail.value}
											</Typography>
											<Typography className={classes.heading}>
												Weight: {this.props.detail.weight}lbs
											</Typography>
											<Typography className={classes.heading}>
												Fragile: {this.props.detail.fragile}
											</Typography>
											</Grid>
                    </Card>
                    <Card className={this.props.classes.summaryCard2} >
                      <Grid container direction="column" alignItems="flex-start" padding="0 0 0 20px">
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
											</Grid>
                    </Card>
                  </Grid>
                  <Card>
                      <Typography variant="h6" className={classes.shipmentTitle}>
                        Shipment Summary:
                      </Typography>
                        <Grid 
                          className={this.props.classes.shipmentContainer} 
                          container 
                          justify="space-evenly" 
                          direction="row"
                        >
                        {this.props.detail.shipments ? (
                          this.props.detail.shipments.map((shipment, i) => {
                            return (
                                <Grid key={i}
                                  container
                                  direction="column"
                                  className={this.props.classes.individualShipment}
                                >
                                <Typography className={classes.shipmentHeading}>
                                  Date Shipped: {shipment.dateShipped}
                                </Typography>
                                <Typography className={classes.shipmentHeading}>
                                  Last Updated: {shipment.lastUpdated}
                                </Typography>
                                <Typography className={classes.shipmentHeading}>
                                  Shipped To: {shipment.shippedTo}
                                </Typography>
                                <Typography className={classes.shipmentHeading}>
                                  Date Arrived: {shipment.dateArrived}
                                </Typography>
                                <Typography className={classes.shipmentHeading}>
                                  Tracking Number: {shipment.trackingNumber}
                                </Typography>
                                <Typography className={classes.shipmentHeading}>
                                  Status: {shipment.status}
                                </Typography>
                                <Typography className={classes.shipmentHeading}>
                                  Carrier Name: {shipment.carrierName}
                                </Typography>
                                </Grid>
                            )
                          })
                          ) : (
                          <div>There are no shipments associated with this product.</div>
                          )
                        }
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          
                        >
                        <Tooltip title="Previous Shipment">
                          <Button 
                            variant="contained"
                            className={classes.submit}
                            onClick={() => this.previousPage()}>
														{/* Previous Page */}
														<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg>								
                          </Button>
                        </Tooltip>
                        <Tooltip title="Next Shipment">
                          <Button 
                            variant="contained"
                            className={classes.submit}
                            onClick={() => this.nextPage()}>
														{/* Next Page */}
														<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z"/></svg>							
                          </Button>
                        </Tooltip>
                        </Grid>
                  </Card>
								</div>
								: null 
              }
              </div>
							<div>
								<Grid
									container
									direction="row"
									justify="space-between"
									alignItems="center">
									<Grid
										container
										direction="row"
										justify="flex-end"
										alignItems="center">
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
													this.props.deleteProduct(
														this.props.product.uuid,
														event,
													)
												}
											/>
										</div>
									</Grid>
									<Typography variant="h6" id="modal-title">
										{this.props.product.name}
									</Typography>
								</Grid>
							</div>
							<div>
								{this.props.detail ? (
									<div>
										<Typography
											variant="h6"
											id="modal-title"
											className={this.props.classes.prodSum}>
											Product Summary
										</Typography>
										<Grid
											className={this.props.classes.descriptionAndDimensions}
											container
											alignItems="center"
											direction="row">
											<Card className={this.props.classes.summaryCard}>
												<Grid direction="column" flexWrap="wrap">
													<Typography>
														Description: {this.props.detail.productDescription}
													</Typography>
													<Typography className={classes.heading}>
														Price: ${this.props.detail.value}
													</Typography>
													<Typography className={classes.heading}>
														Weight: {this.props.detail.weight}lbs
													</Typography>
													<Typography className={classes.heading}>
														Fragile: {this.props.detail.fragile}
													</Typography>
												</Grid>
											</Card>
											<Card className={this.props.classes.summaryCard2}>
												<Grid
													container
													direction="column"
													alignItems="flex-end">
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
												</Grid>
											</Card>
										</Grid>
										<Card>
											<Typography className={classes.shipmentTitle}>
												Shipment Summary:
											</Typography>
											<Grid
												className={this.props.classes.shipmentContainer}
												container
												justify="space-evenly"
												direction="row">
												{this.props.detail.shipments ? (
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
																	Date Shipped: {shipment.dateShipped}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Last Updated: {shipment.lastUpdated}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Shipped To: {shipment.shippedTo}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Date Arrived: {shipment.dateArrived}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Tracking Number: {shipment.trackingNumber}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Status: {shipment.status}
																</Typography>
																<Typography className={classes.shipmentHeading}>
																	Carrier Name: {shipment.carrierName}
																</Typography>
															</Grid>
														);
													})
												) : (
													<div>
														There are no shipments associated with this product.
													</div>
												)}
											</Grid>
											<Grid container direction="row" justify="space-between">
												<Tooltip title="Previous Shipment">
													<Button
														variant="contained"
														className={classes.submit}
														onClick={() => this.previousPage()}>
														Previous Page
													</Button>
												</Tooltip>
												<Tooltip title="Next Shipment">
													<Button
														variant="contained"
														className={classes.submit}
														onClick={() => this.nextPage()}>
														Next Page
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
											className={classes.submit}
											onClick={event => this.handleClose(event)}>
											Close
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
