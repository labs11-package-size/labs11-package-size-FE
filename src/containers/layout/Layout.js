import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import Footer from '../../components/footer/Footer';
import Routes from '../../routes/Routes';
import { SideBar } from '../../components/navigation/SideBar';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	grow: {
		flexGrow: 1,
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
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
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200,
			},
		},
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	drawerPaper: {
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
		open: false,
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

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
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(
								classes.menuButton,
								this.state.open && classes.menuButtonHidden,
							)}>
							<MenuIcon />
						</IconButton>
						<div
							className={classes.grow}
							style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography
								className={classes.title}
								variant="h6"
								color="inherit"
								noWrap>
								ScannAR
							</Typography>
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Search…"
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
								/>
							</div>
							<Button color="inherit">Login</Button>
						</div>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: classNames(
							classes.drawerPaper,
							!this.state.open && classes.drawerPaperClose,
						),
					}}
					open={this.state.open}>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>{SideBar}</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />
					<Routes />
					<Footer />
				</main>
			</div>
		);
	}
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
