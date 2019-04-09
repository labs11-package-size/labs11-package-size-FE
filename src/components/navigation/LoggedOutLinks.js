import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

const LoggedOutLinks = props => {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<Button>
				<NavLink
					style={{ textDecorationLine: 'none', color: 'white' }}
					to="/signup">
					Sign Up
				</NavLink>
			</Button>
			<Button color="inherit">
				<NavLink
					style={{ textDecorationLine: 'none', color: 'white' }}
					to="/login">
					Sign In
				</NavLink>
			</Button>
		</div>
	);
};

export default withStyles(styles)(LoggedOutLinks);
