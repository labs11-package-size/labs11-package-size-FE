import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
					<Button size="small" color="primary">
						<span onClick={() => props.editUser(this.userInfo)}>Edit</span>
					</Button>
				</div>
			)}
		</div>
	);
}

Account.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
