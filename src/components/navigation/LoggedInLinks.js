import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import List from '@material-ui/core/List';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const styles = {
	root: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		color: '#72BDA2',
	},
};

class LoggedInLinks extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<List component="nav">
					<ListItem onClick={() => this.props.history.push('/products')} button>
						<ListItemIcon className={classes.menuButton}>
							<Icon className={classNames(classes.icon, 'fas fa-boxes')} />
						</ListItemIcon>
						<ListItemText primary="Products" />
					</ListItem>
					<ListItem
						onClick={() => this.props.history.push('/shipments')}
						button>
						<ListItemIcon className={classes.menuButton}>
							<Icon
								className={classNames(classes.icon, 'fas fa-shipping-fast')}
							/>
						</ListItemIcon>

						<ListItemText primary="Shipments" />
					</ListItem>

					<ListItem onClick={() => this.props.history.push('/packages')} button>
						<ListItemIcon className={classes.menuButton}>
							<Icon className={classNames(classes.icon, 'fas fa-box')} />
						</ListItemIcon>
						<ListItemText primary="Packages" />
					</ListItem>
					<ListItem onClick={() => this.props.history.push('/logout')} button>
						<ListItemIcon className={classes.menuButton}>
							<Icon
								className={classNames(classes.icon, 'fas fa-sign-out-alt')}
							/>
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItem>
				</List>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(LoggedInLinks));
