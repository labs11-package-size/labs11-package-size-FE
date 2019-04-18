import React from 'react';
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

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Avatar from '@material-ui/core/Avatar';

import { connect } from 'react-redux';
import { compose } from 'redux';
import {
	addPackage,
	deleteSelectedProduct,
	deleteAllSelected
} from '../../store/actions/shipmentActions';
import LoggedInLinks from '../../components/navigation/LoggedInLinks';
import LoggedOutLinks from '../../components/navigation/LoggedOutLinks';

const drawerWidth = 200;

const styles = theme => ({
	root: {
		display: 'flex',
		margin: '0 auto',
	},
	toolbar: {
		paddingRight: 24,
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
		flexGrow: 1,
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
		height: '100vh',
		overflow: 'auto',
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
		open: true,
	};

	componentDidUpdate = (prevProps, prevState) => {
		if ((this.props.selectedProducts.length > 0) && (prevProps.selectedProducts !== this.props.selectedProducts)) {
	this.handleDrawerOpen() }
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		if (this.props.selectedProducts.length === 0) {
		this.setState({ open: false });
		}
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				open: false,
			});
		}, 1000);
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="absolute"
					className={classNames(
						classes.appBar,
						this.state.open && classes.appBarShift,
					)}>
					<Toolbar
						disableGutters={!this.state.open}
						className={classes.toolbar}>
						{/* <IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(
								classes.menuButton,
								this.state.open && classes.menuButtonHidden,
							)}>
							<MenuIcon />
						</IconButton> */}
						<Typography
							onClick={() => this.props.history.push('/')}
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							className={classes.title}>
							<Button style={{ marginLeft: "20px", color: '#0D2C54' }}>
								<Typography color="inherit" variant="h6">
									ScannAR
								</Typography>
							</Button>
						</Typography>
						{this.props.isLoggedIn ? (
							<Avatar
								alt={this.props.userInfo.displayName}
								src={this.props.userInfo.photoURL}
								className={classes.avatar}
							/>
						) : (
							<AccountCircle />
						)}
					</Toolbar>
				</AppBar>
				<Drawer
					onMouseEnter={() => this.handleDrawerOpen()}
					onMouseLeave={() => this.handleDrawerClose()}
					variant="permanent"
					classes={{
						paper: classNames(
							classes.drawerPaper,
							!this.state.open && classes.drawerPaperClose,
						),
					}}
					open={this.state.open}>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={() => this.setState({ open: false })}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					{this.props.isLoggedIn ? (
						<LoggedInLinks
							deleteAllSelected={this.props.deleteAllSelected}
							deleteSelected={this.props.deleteSelectedProduct}
							addPackage={this.props.addPackage}
							handleDrawerOpen={this.handleDrawerOpen}
							selectedProducts={this.props.selectedProducts}
						/>
					) : (
						<LoggedOutLinks />
					)}
				</Drawer>
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
			{ addPackage, deleteSelectedProduct, deleteAllSelected },
		)(withStyles(styles)(Layout)),
	),
);
