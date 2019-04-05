import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DeleteModal from '../modals/deleteModal';
import AddShipmentModal from '../modals/AddShimpentModal';
import EditProductModal from '../modals/EditProductModal';

const styles = theme => ({
	card: {
		maxWidth: 400,
	},
	container: {
		margin: 40,
		width: 'auto',
		display: 'flex',
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},

	input: {
		margin: theme.spacing.unit,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	actions: {
		display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
});

class Product extends Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<div className={classes.root}>
					<Card className={classes.card}>
						<CardHeader
							avatar={
								<Avatar aria-label="Recipe" className={classes.avatar}>
									R
								</Avatar>
							}
							action={
								<IconButton>
									<MoreVertIcon />
								</IconButton>
							}
							title={this.props.product.name}
						/>
						<CardMedia
							className={classes.media}
							image="/static/images/cards/paella.jpg"
							title="Paella dish"
						/>
						<CardContent>
							<Typography className={classes.heading}>
								Description: {this.props.product.productDescription}
							</Typography>
						</CardContent>
						<CardActions className={classes.actions} disableActionSpacing>
							<div aria-label="Add Shipment">
								<AddShipmentModal>
									<form className={classes.container}>
										<Input
											onChange={this.props.handleChange}
											name="trackingNumber"
											value={this.props.trackingNumber}
											inputProps={{
												'aria-label': 'Tracking number',
											}}
										/>

										<Button
											onClick={() =>
												this.props.addShipment(
													this.props.trackingNumber,
													this.props.product.identifier,
												)
											}
											size="small">
											Add Shipment
										</Button>
									</form>
								</AddShipmentModal>
							</div>
							<div aria-label="delete">
								<DeleteModal>
									<Button
										onClick={() =>
											this.props.deleteProduct(this.props.product.uuid)
										}
										size="small"
										color="primary">
										Delete
									</Button>
								</DeleteModal>
							</div>

							<div aria-label="delete">
								<EditProductModal>
									<form className={classes.container}>
										<Input
											onChange={this.props.handleChange}
											name="name"
											value={this.props.name}
											label={this.props.product.name}
											placeholder="Product Name"
											className={classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>

										<Input
											onChange={this.props.handleChange}
											name="productDescription"
											value={this.props.productDescription}
											label={this.props.product.productDescription}
											placeholder="Description"
											className={classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>

										<Input
											onChange={this.props.handleChange}
											name="height"
											value={this.props.height}
											label={this.props.product.height}
											placeholder="Height"
											className={classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>

										<Input
											onChange={this.props.handleChange}
											name="length"
											value={this.props.length}
											label={this.props.product.length}
											placeholder="Length"
											className={classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>
										<Input
											onChange={this.props.handleChange}
											name="value"
											value={this.props.value}
											label={this.props.product.value}
											placeholder="Value"
											className={classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>
										<Input
											onChange={this.props.handleChange}
											name="weight"
											value={this.props.weight}
											label={this.props.product.weight}
											placeholder="Weight"
											className={classes.input}
											inputProps={{
												'aria-label': 'Description',
											}}
										/>
										<Button onClick={this.props.editProduct} size="small">
											Submit
										</Button>
									</form>
								</EditProductModal>
							</div>
							<IconButton
								className={classnames(classes.expand, {
									[classes.expandOpen]: this.state.expanded,
								})}
								onClick={this.handleExpandClick}
								aria-expanded={this.state.expanded}
								aria-label="Show more">
								<ExpandMoreIcon />
							</IconButton>
						</CardActions>
						<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<Typography className={classes.heading}>
									Value: {this.props.product.value}
								</Typography>
								<Typography className={classes.heading}>
									Length: {this.props.product.length}
								</Typography>
								<Typography className={classes.heading}>
									Width: {this.props.product.width}
								</Typography>
								<Typography className={classes.heading}>
									Height: {this.props.product.height}
								</Typography>
								<Typography className={classes.heading}>
									Fragile: {this.props.product.fragile}
								</Typography>
							</CardContent>
						</Collapse>
					</Card>
				</div>
			</div>
		);
	}
}

Product.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Product);
