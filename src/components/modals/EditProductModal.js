import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

function getModalStyle() {
	const top = 50;
	const left = 30;

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

class EditProductModal extends React.Component {
	state = {
		open: false,
	};

	handleOpen = event => {
		event.stopPropagation();
		this.setState({ open: true });
	};
	handleEdit = event => {
		event.stopPropagation();
		this.props.edit(event);
		this.setState({
			open: false,
		});
	};

	handleClose = event => {
		event.stopPropagation();
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;

		return (
			<div onClick={event => event.stopPropagation()}>
				<Tooltip title="Edit">
					<Button
						variant="contained"
						className={classes.submit}
						onClick={event => this.handleOpen(event)}>
						<Icon className={classNames(classes.icon, 'fas fa-pencil-alt')} />
					</Button>
				</Tooltip>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={event => this.handleClose(event)}>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography variant="h6" id="modal-title">
							Are you sure you want to edit this product?
						</Typography>
						<div>
							{this.props.children}
							<div className={classes.root}>
								<Button
									onClick={event => this.handleEdit(event)}
									variant="contained"
									className={classes.submit}>
									Edit
								</Button>
								<Button
									variant="contained"
									onClick={event => this.handleClose(event)}>
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

EditProductModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProductModal);
