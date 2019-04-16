import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
	handlePackit = () => {
		const list = this.props.selectedProducts.map(prod => prod.uuid);
		this.props.addPackage(list);
		this.props.history.push('/');
	};

	handleRenderList = () => {
		if (this.props.selectedProducts.length > 0) {
			return (
				<Paper>
					<List>
						<Typography>List</Typography>
						{this.props.selectedProducts.map((prod, i) => (
							<ListItem key={i}>
								<ListItemText primary={prod.name} />
							</ListItem>
						))}
					</List>
					<Divider />
					<Button onClick={this.handlePackit}>Pack It</Button>
				</Paper>
			);
		} else {
			return null;
		}
	};
	render() {
		const { classes } = this.props;
		return (
			<div>
				<List component="nav">
					<ListItem onClick={() => this.props.history.push('/products')} button>
						<Tooltip title="Product List">
							<ListItemIcon className={classes.menuButton}>
								<Icon className={classNames(classes.icon, 'fas fa-boxes')} />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary="Products" />
					</ListItem>
					<ListItem
						onClick={() => this.props.history.push('/shipments')}
						button>
						<Tooltip title="Shipment List">
							<ListItemIcon className={classes.menuButton}>
								<Icon
									className={classNames(classes.icon, 'fas fa-shipping-fast')}
								/>
							</ListItemIcon>
						</Tooltip>

						<ListItemText primary="Shipments" />
					</ListItem>

					<ListItem
						onClick={() => this.props.history.push('/packaging')}
						button>
						<Tooltip title="Package List">
							<ListItemIcon className={classes.menuButton}>
								<Icon className={classNames(classes.icon, 'fas fa-box')} />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary="Packages" />
					</ListItem>
					<ListItem onClick={() => this.props.history.push('/logout')} button>
						<Tooltip title="Logout">
							<ListItemIcon className={classes.menuButton}>
								<Icon
									className={classNames(classes.icon, 'fas fa-sign-out-alt')}
								/>
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary="Logout" />
					</ListItem>
				</List>
				<Divider />
				{this.handleRenderList()}
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(LoggedInLinks));
