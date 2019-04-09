import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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

class EditProductModal extends React.Component {
	state = {
		open: false,
	};

	handleOpen = () => {
		this.setState({ open: true }, () =>
			this.props.updateState(this.props.product),
		);
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Button onClick={this.handleOpen}>Edit</Button>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography variant="h6" id="modal-title">
							Are you sure you want to edit this product?
						</Typography>
						<div>
							{this.props.children}
							<Button onClick={this.handleClose}> Cancel</Button>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

EditProductModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProductModal);
