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
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteModal from '../modals/deleteModal';
import EditProductModal from '../modals/EditProductModal';

const styles = theme => ({
	card: {
		width: 275,
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
									P
								</Avatar>
							}
							title={this.props.product.name}
						/>

						<img
							id={this.props.product.uuid}
							style={{ width: 100 }}
							src={this.props.product.thumbnail}
							alt="product"
						/>

						<CardActions className={classes.actions} disableActionSpacing>
							<div aria-label="add">
								<Button
									onClick={() =>
										this.props.selectProduct(this.props.product.uuid)
									}>
									<Icon
										className={classNames(
											classes.icon,
											'fas fa-clipboard-check',
										)}
									/>
								</Button>
							</div>
							<div aria-label="delete">
								<DeleteModal
									delete={() =>
										this.props.deleteProduct(this.props.product.uuid)
									}
								/>
							</div>

							<div aria-label="edit">
								<EditProductModal
									edit={() => {
										this.props.editProduct(
											this.props.product.uuid,
											this.props.updatedProduct,
										);
									}}
									product={this.props.product}
									updateState={this.props.updateState}>
									<form className={classes.formContainer}>
										<Input
											required
											onChange={this.props.handleChange}
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
											required
											onChange={this.props.handleChange}
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
											required
											onChange={this.props.handleChange}
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
											required
											onChange={this.props.handleChange}
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
							<Tooltip title="More Details...">
								<IconButton
									className={classnames(classes.expand, {
										[classes.expandOpen]: this.state.expanded,
									})}
									onClick={this.handleExpandClick}
									aria-expanded={this.state.expanded}
									aria-label="Show more">
									<ExpandMoreIcon />
								</IconButton>
							</Tooltip>
						</CardActions>
						<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<Typography>
									Description: {this.props.product.productDescription}
								</Typography>

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
