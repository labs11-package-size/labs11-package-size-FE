import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import EditAccountModal from '../modals/EditAccountModal';

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

function Account(props) {
	const { classes } = props;
	console.log(props, 'account props')
	return (
		<div>
			{!props.user ? (
				<div>...Loading</div>
			) : (
				<div className={classes.root}>
					<div className={classes.column}>
						<Typography gutterBottom variant="h5" component="h2">
							User Account
						</Typography>
						<Typography className={classes.heading}>
							Display Name: {props.user.displayName}
						</Typography>
						<Typography className={classes.heading}>
							Email Address: {props.user.email}
						</Typography>
						{/* photoURL */}
					</div>
					<EditAccountModal>
						<form className={classes.container}>
							<Input
								//type="text"
								name="displayName"
								placeholder="Display Name"
								onChange={props.handleInputChange}
								value={props.user.displayName}
								className={classes.input}
								inputProps={{
									'aria-label': 'Description',
								}}
							/>
							<Input
								//type="text"
								name="email"
								placeholder="Email Address"
								onChange={props.handleInputChange}
								value={props.user.email}
								className={classes.input}
								inputProps={{
									'aria-label': 'Description',
								}}
							/>
							<Button size="small" color="primary">
								<span onClick={props.editUser}>Save Changes</span>
							</Button>
						</form>
					</EditAccountModal>
				</div>
			)}
		</div>
	);
}

Account.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
