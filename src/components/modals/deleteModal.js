import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
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
		outline: 'none',
	},
	submit: {
		color: 'white',
		backgroundColor: '#72BDA2',
		'&:hover': {
			color: '#72BDA2',
			backgroundColor: 'white',
		},
	},
	root: {
		margin: 10,
		display: 'flex',
		justifyContent: 'space-between',
	},
});

class DeleteModal extends React.Component {
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
				<Tooltip title="Delete" disableFocusListener={this.state.open}>
					<Button
						variant="contained"
						className={classes.submit}
						onClick={this.handleOpen}>
						<DeleteIcon />
					</Button>
				</Tooltip>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography variant="h6" id="modal-title">
							Are you sure you want to delete?
						</Typography>
						<div>
							{this.props.children}
							<div className={classes.root}>
								<Button
									onClick={this.props.delete}
									variant="contained"
									className={classes.submit}>
									Delete product
								</Button>
								<Button variant="contained" onClick={this.handleClose}>
									Cancel
								</Button>
							</div>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

DeleteModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteModal);
