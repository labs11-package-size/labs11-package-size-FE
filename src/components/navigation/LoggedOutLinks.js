import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import List from '@material-ui/core/List';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const styles = {
	root: {
		margin: '0 auto',
		width: '300px',
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'space-around',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		color: '#72BDA2',
	},
};

const LoggedOutLinks = props => {
	const { classes } = props;
	return (
		<div>
			<List component="nav" className={classes.root}>
				<ListItem onClick={() => props.history.push('/auth/login')} button>
					<ListItemIcon className={classes.menuButton}>
						<Icon className={classNames(classes.icon, 'fas fa-play')} />
					</ListItemIcon>
					<ListItemText primary="Login" />
				</ListItem>
				<ListItem onClick={() => props.history.push('/auth/register')} button>
					<ListItemIcon className={classes.menuButton}>
						<Icon className={classNames(classes.icon, 'fas fa-sign-out-alt')} />
					</ListItemIcon>
					<ListItemText primary="Sign Up" />
				</ListItem>
			</List>
		</div>
	);
};

export default withRouter(withStyles(styles)(LoggedOutLinks));
