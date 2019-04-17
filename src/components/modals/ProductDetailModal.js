import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PopoutIcon from '@material-ui/icons/LibraryBooks';
import Tooltip from '@material-ui/core/Tooltip';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Input from '@material-ui/core/Input';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';

import EditProductModal from '../modals/EditProductModal';

import DeleteModal from './deleteModal';

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
		width: 200,
	},
	container: {
		margin: 40,
		width: 'auto',
		display: 'flex',
	},
	formContainer: {
		margin: 40,
		width: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
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
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
});

class ProductDetailModal extends React.Component {
	state = {
		open: false,
	};

	handleOpen = event => {
		event.stopPropagation();
		this.setState({ open: true });
	};

	handleClose = event => {
		event.stopPropagation();
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<div className={classes.root}>
					<Card
						onClick={event => {
							this.handleOpen(event);
						}}
						className={classes.card}>
						<CardHeader subheader={this.props.product.name} />

						<CardMedia
							className={classes.media}
							id={this.props.product.uuid}
							// style={{ width: 100 }}
							image={this.props.product.thumbnail}
							alt="product"
						/>

						<CardActions className={classes.actions} disableActionSpacing>
							<div aria-label="add">
								<Button
									onClick={event =>
										this.props.selectProduct(this.props.product, event)
									}>
									<Icon
										className={classNames(
											classes.icon,
											'fas fa-clipboard-check',
										)}
									/>
								</Button>
							</div>
							<div aria-label="edit">
								<EditProductModal
									onClick={event => event.stopPropagation()}
									edit={event =>
										this.props.editProduct(
											this.props.product.uuid,
											this.props.updatedProduct,
											event,
										)
									}
									product={this.props.product}>
									<form className={classes.formContainer}>
										<Input
											onClick={event => event.stopPropagation()}
											required
											onChange={event => this.props.handleChange(event)}
											name="name"
											defaultValue={this.props.product.name}
											label={this.props.product.name}
											placeholder="Product Name"
											className={classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>

										<Input
											onClick={event => event.stopPropagation()}
											required
											onChange={event => this.props.handleChange(event)}
											name="productDescription"
											defaultValue={this.props.product.productDescription}
											label={this.props.product.productDescription}
											placeholder="Description"
											className={classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>

										<Input
											onClick={event => event.stopPropagation()}
											required
											onChange={event => this.props.handleChange(event)}
											name="value"
											defaultValue={this.props.product.value}
											label={this.props.product.value}
											placeholder="Value"
											className={classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>
										<Input
											onClick={event => event.stopPropagation()}
											required
											onChange={event => this.props.handleChange(event)}
											name="weight"
											defaultValue={this.props.product.weight}
											label={this.props.product.weight}
											placeholder="Weight"
											className={classes.input}
											inputProps={{
												'aria-label': 'Description',
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
							<div>
								{/* route to shipments */}
								<Button>Pack It</Button>
							</div>
							<div aria-label="delete">
								<DeleteModal
									delete={event =>
										this.props.deleteProduct(this.props.product.uuid, event)
									}
								/>
							</div>
							<div>
								<Typography variant="h6" id="modal-title">
									Product Information
								</Typography>
								<div>
									<Typography>
										Description: {this.props.product.productDescription}
									</Typography>
									<Typography className={classes.heading}>
										Price: {this.props.product.value}
									</Typography>
									<Typography className={classes.heading}>
										Fragile: {this.props.product.fragile}
									</Typography>
								</div>
								<div>
									<Typography className={classes.heading}>
										Product Dimensions:
									</Typography>
									<Typography className={classes.heading}>
										Length: {this.props.product.length}"
									</Typography>
									<Typography className={classes.heading}>
										Width: {this.props.product.width}"
									</Typography>
									<Typography className={classes.heading}>
										Height: {this.props.product.height}"
									</Typography>
								</div>
							</div>
							<div>
								<Button onClick={event => this.handleClose(event)}>
									Close
								</Button>
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

export default withStyles(styles)(ProductDetailModal);
