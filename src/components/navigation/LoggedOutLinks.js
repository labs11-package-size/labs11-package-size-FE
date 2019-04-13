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
			<List component="nav">
				<ListItem onClick={() => props.history.push('/auth/login')} button>
					<ListItemIcon>
						<Icon className={classNames(classes.icon, 'fas fa-play')} />
					</ListItemIcon>
					<ListItemText primary="Login" />
				</ListItem>
				<ListItem onClick={() => props.history.push('/auth/register')} button>
					<ListItemIcon>
						<Icon className={classNames(classes.icon, 'fas fa-sign-out-alt')} />
					</ListItemIcon>
					<ListItemText primary="Sign Up" />
				</ListItem>
			</List>
		</div>
	);
};

export default withRouter(withStyles(styles)(LoggedOutLinks));
