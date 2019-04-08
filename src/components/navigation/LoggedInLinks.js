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

const LoggedInLinks = props => {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<Button>
				<NavLink
					style={{ textDecorationLine: 'none', color: 'white' }}
					to="/account">
					Account
				</NavLink>
			</Button>
			<Button color="inherit">
				<NavLink
					style={{ textDecorationLine: 'none', color: 'white' }}
					to="/products">
					Products
				</NavLink>
			</Button>
			<Button color="inherit">
				<NavLink
					style={{ textDecorationLine: 'none', color: 'white' }}
					to="/shipments">
					Shipments
				</NavLink>
			</Button>
			<Button color="inherit">
				<NavLink
					style={{ textDecorationLine: 'none', color: 'white' }}
					to="/packages">
					Packages
				</NavLink>
			</Button>
			<Button color="inherit">
				<NavLink style={{ textDecorationLine: 'none', color: 'white' }} to="/">
					Logout
				</NavLink>
			</Button>
		</div>
	);
};

export default withStyles(styles)(LoggedInLinks);
