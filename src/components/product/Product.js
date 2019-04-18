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
import ProductDetailModal from '../modals/ProductDetailModal';

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
});

class Product extends Component {
	state = { expanded: false };

	handleSelectProd = product => {
		let selected = {
			name: product.name,
			uuid: product.uuid,
		};

		this.props.selectProduct(selected);
	};

	render() {
		return (
			<ProductDetailModal
				product={this.props.product}
				deleteProduct={this.props.deleteProduct}
				selectProduct={this.props.selectProduct}
				editProduct={this.props.editProduct}
				handleChange={this.props.handleChange}
				trackingNumber={this.props.trackingNumber}
				updateState={this.props.updateModalState}
				addShipment={this.props.addShipment}
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
		);
	}
}

Product.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Product);
