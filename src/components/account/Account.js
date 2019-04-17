import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import EditAccountModal from '../modals/EditAccountModal';

const styles = theme => ({
	root: {
		width: '100%',
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	icon: {
		verticalAlign: 'bottom',
		height: 20,
		width: 20,
	},
	details: {
		alignItems: 'center',
	},
	column: {
		flexBasis: '33.33%',
	},
	helper: {
		borderLeft: `2px solid ${theme.palette.divider}`,
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
});

const Account = props => {
	return (
		<div>
			<div className={props.classes.root}>
				<div className={props.classes.column}>
					<Typography gutterBottom variant="h5" component="h2">
						User Account
					</Typography>
					<Typography className={props.classes.heading}>
						Display Name: {props.userInfo.displayName}
					</Typography>
					<Typography className={props.classes.heading}>
						Email Address: {props.userInfo.email}
					</Typography>
				</div>
				{/* <EditAccountModal>
					<form className={props.classes.container}>
						<Input
							name="displayName"
							placeholder="Display Name"
							onChange={props.handleInputChange}
							value={props.userInfo.displayName}
							className={props.classes.input}
							inputProps={{
								'aria-label': 'Description',
							}}
						/>
						<Input
							name="email"
							placeholder="Email Address"
							onChange={props.handleInputChange}
							value={props.userInfo.email}
							className={props.classes.input}
							inputProps={{
								'aria-label': 'Description',
							}}
						/>
						<Button size="small" color="primary">
							<span onClick={props.editUser}>Save Changes</span>
						</Button>
					</form>
				</EditAccountModal> */}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoggedIn: state.userReducer.isLoggedIn,
		userInfo: state.firebaseReducer.auth,
	};
};

Account.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default compose(
	connect(
		mapStateToProps,
		{},
	),
)(withStyles(styles)(Account));
