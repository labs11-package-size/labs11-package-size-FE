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

class AddProductModal extends React.Component {
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
				<Button
					style={{
						marginTop: 20,
						backgroundColor: '#72BDA2',
						color: 'white',
						padding: 15,
					}}
					onClick={this.handleOpen}>
					<Typography style={{ color: 'white' }}>Add Product</Typography>
				</Button>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography variant="h6" id="modal-title">
							Add a new product
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

AddProductModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProductModal);
