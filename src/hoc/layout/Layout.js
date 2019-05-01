import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { connect } from 'react-redux';
import { compose } from 'redux';
import {
	addPackage,
	deleteSelectedProduct,
} from '../../store/actions/shipmentActions';
import LoggedInLinks from '../../components/navigation/LoggedInLinks';
import LoggedOutLinks from '../../components/navigation/LoggedOutLinks';

const drawerWidth = 200;

const styles = theme => ({
	root: {
		display: 'flex',
		margin: '0 auto',
	},
	submit: {
		display: 'flex',
		justifyContent: 'center',
		borderRadius: 5,
		color: 'white',
		backgroundColor: '#72BDA2',
		'&:hover': {
			color: '#72BDA2',
			backgroundColor: 'white',
		},
		margin: '10px',
	},
	toolbar: {
		paddingRight: 24,
		display: 'flex',
		justifyContent: 'space-between',
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		right: 'auto',
		backgroundColor: '#F2F3F4',
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
		color: '#72BDA2',
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		// flexGrow: 1,
	},
	avatar: {
		cursor: 'pointer',
	},
	paper_class: {
		padding: 10,
	},
	drawerPaper: {
		margin: '0 auto',
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9,
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		marginTop: 50,
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		overflow: 'auto',
	},
	nav_content: {
		display: 'flex',
		marginLeft: 0,
		justifyContent: 'space-between',
	},
	chartContainer: {
		marginLeft: -22,
	},
	tableContainer: {
		height: 320,
	},
	h5: {
		marginBottom: theme.spacing.unit * 2,
	},
});

class Layout extends React.Component {
	state = {
		open: false,
		menuOpen: false,
		anchorEl: null,
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	render() {
		const { classes } = this.props;
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classNames(
						classes.appBar,
						this.state.open && classes.appBarShift,
					)}>
					<Toolbar
						disableGutters={!this.state.open}
						className={classes.toolbar}>
						<Typography
							onClick={() => this.props.history.push('/')}
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							className={classes.title}>
							<Button style={{ color: '#0D2C54' }}>
								<Typography color="inherit" variant="h6">
									ScannAR
								</Typography>
							</Button>
						</Typography>
						<div>
							{this.props.isLoggedIn && (
								<LoggedInLinks
									deleteSelected={this.props.deleteSelectedProduct}
									addPackage={this.props.addPackage}
									handleDrawerOpen={this.handleDrawerOpen}
									selectedProducts={this.props.selectedProducts}
								/>
							)}
						</div>
						<div>
							{this.props.isLoggedIn && (
								<div>
									<Avatar
										onClick={this.handleMenu}
										alt={this.props.userInfo.displayName}
										src={this.props.userInfo.photoURL}
										className={classes.avatar}
									/>

									<Menu
										style={{ marginTop: '40px' }}
										id="menu-appbar"
										anchorEl={anchorEl}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										}}
										transformOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										}}
										open={open}
										onClose={this.handleClose}>
										<Paper className={classes.paper_class}>
											<Typography
												style={{
													fontSize: '18px',
													fontWeight: 600,
												}}>
												Account Detail
											</Typography>
											<Divider />
											<div
												style={{
													fontSize: '14px',
													fontWeight: 500,
												}}>
												<Typography
													style={{
														fontSize: '14px',
														fontWeight: 500,
														paddingTop: '12px',
													}}>
													Display Name: {this.props.userInfo.displayName}
												</Typography>
												<Typography
													style={{
														fontSize: '14px',
														fontWeight: 500,
														paddingTop: '12px',
													}}>
													Email Address: {this.props.userInfo.email}
												</Typography>
											</div>
										</Paper>
										<MenuItem
											className={classes.submit}
											onClick={() => this.props.history.push('/logout')}>
											Logout
										</MenuItem>
									</Menu>
								</div>
							)}
						</div>
					</Toolbar>
				</AppBar>

				<main className={classes.content}>{this.props.children}</main>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.userReducer.isLoggedIn,
		userInfo: state.firebaseReducer.auth,
		selectedProducts: state.shipmentsReducer.selectedProducts,
	};
};

Layout.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default compose(
	withRouter(
		connect(
			mapStateToProps,
			{ addPackage, deleteSelectedProduct },
		)(withStyles(styles)(Layout)),
	),
);
