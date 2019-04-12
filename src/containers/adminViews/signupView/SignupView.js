import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { emailLogin } from '../../../store/actions/userActions';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: '#72BDA2',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
		backgroundColor: '#72BDA2',
		color: 'white',
		'&:hover': {
			color: '#72BDA2',
			backgroundColor: 'white',
			border: 'solid 5px #72BDA2',
		},
	},
});

class SignupView extends Component {
	state = {
		user: {
			firstName: '',
			lastName: '',
			emailAddress: '',
			displayName: '',
			password: '',
		},
		error: null,
	};

	handleChange = e => {
		this.setState({
			user: {
				...this.state.user,
				[e.target.name]: e.target.value,
			},
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.emailLogin(this.state.user);
		this.setState({
			user: {
				firstName: '',
				lastName: '',
				emailAddress: '',
				displayName: '',
				password: '',
			},
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<main className={classes.main}>
					<CssBaseline />
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Register
						</Typography>

						<form className={classes.form}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="name">First Name</InputLabel>
								<Input
									id="firstName"
									value={this.state.user.firstName}
									onChange={this.handleChange}
									name="firstName"
									autoFocus
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="last-name">Last Name</InputLabel>
								<Input
									id="last-name"
									value={this.state.user.lastName}
									onChange={this.handleChange}
									name="lastName"
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="email">Email</InputLabel>
								<Input
									id="email"
									value={this.state.user.emailAddress}
									onChange={this.handleChange}
									name="emailAddress"
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="password">Password</InputLabel>
								<Input
									onChange={this.handleChange}
									value={this.state.user.password}
									name="password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
							</FormControl>
							{this.state.error && (
								<Typography>{this.state.error.message}</Typography>
							)}
							<Button
								onClick={this.handleSubmit}
								type="submit"
								fullWidth
								variant="contained"
								className={classes.submit}>
								Sign Up
							</Button>
						</form>
					</Paper>
				</main>
			</div>
		);
	}
}

export default connect(
	null,
	{ emailLogin },
)(withStyles(styles)(SignupView));
