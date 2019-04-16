import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PopoutIcon from '@material-ui/icons/LibraryBooks'
import Tooltip from '@material-ui/core/Tooltip';


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
		outline: 'none'
	},
});

class ViewPackageModal extends React.Component {
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
				<Tooltip title="Set as Shipment" disableFocusListener={this.state.open}>
					<PopoutIcon />
				</Tooltip>
				</span>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}>
					<div style={getModalStyle()} className={classes.paper}>
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

ViewPackageModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewPackageModal);
