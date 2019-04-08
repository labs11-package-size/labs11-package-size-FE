import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import LoggedInLinks from '../navigation/LoggedInLinks';
import LoggedOutLinks from '../navigation/LoggedOutLinks';

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
	links: {
		marginRight: -12,
		marginLeft: 20,
	},
};

const Navigation = props => {
	return (
		<div className={props.classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						className={props.classes.menuButton}
						color="inherit"
						aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						color="inherit"
						className={props.classes.grow}>
						<Button>
							<NavLink
								style={{ textDecorationLine: 'none', color: 'white' }}
								to="/">
								<Typography
									variant="h6"
									color="inherit"
									className={props.classes.grow}>
									ScannAR
								</Typography>
							</NavLink>
						</Button>
					</Typography>
					<div className={props.classes.links}>
						{props.isLoggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoggedIn: state.userReducer.isLoggedIn,
	};
};

Navigation.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect(
	mapStateToProps,
	{},
)(withStyles(styles)(Navigation));
