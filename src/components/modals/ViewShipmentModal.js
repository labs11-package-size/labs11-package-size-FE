import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';

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
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 60,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
});

class ViewShipmentModal extends React.Component {
	state = {
		open: false,
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<span onClick={this.handleOpen}>
					<Tooltip
						title="Expand Shipment"
						disableFocusListener={this.state.open}>
						<Icon
							className={classNames(classes.icon, 'fas fa-external-link-alt')}
						/>
					</Tooltip>
				</span>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography variant="h6" id="modal-title">
							Shipment Info for package to {this.props.shipment.shippedTo}
						</Typography>
						<Typography variant="h6" id="modal-title">
							Contains: {this.props.shipment.productNames.join(', ')}
						</Typography>
						<Typography variant="h6" id="modal-title">
							Tracking Number: {this.props.shipment.trackingNumber}
						</Typography>
						<Typography variant="h6" id="modal-title">
							{this.props.shipment.shippingType}
						</Typography>
						<Typography variant="h6" id="modal-title">
							Box Dimensions: {this.props.shipment.dimensions}
						</Typography>
						<Typography variant="h6" id="modal-title">
							Total Item Weight:{this.props.shipment.totalWeight}
						</Typography>
						<div>
							<Button onClick={this.handleClose}>Go Back to List</Button>
							{this.props.children}
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

ViewShipmentModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewShipmentModal);
