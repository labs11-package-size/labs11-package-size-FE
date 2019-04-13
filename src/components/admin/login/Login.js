import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GoogleButton from 'react-google-button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import withStyles from '@material-ui/core/styles/withStyles';

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
		error: {
			padding: theme.spacing.unit * 2,
			color: 'red',
		},
		errorPaper: {
			padding: theme.spacing.unit * 2,
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
		},
	},
});

const Login = props => {
	const { classes } = props;

	return (
		<div>
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email</InputLabel>
							<Input
								id="email"
								value={props.email}
								onChange={props.handleInputChange}
								name="email"
								autoFocus
							/>
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input
								onChange={props.handleInputChange}
								value={props.password}
								name="password"
								type="password"
								id="password"
							/>
						</FormControl>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							onClick={props.handleEmailLogin}
							type="submit"
							fullWidth
							variant="contained"
							className={classes.submit}>
							Sign in
						</Button>
						<div>
							{props.error && (
								<Paper className={classes.errorPaper} elevation={1}>
									<Typography className={classes.error}>
										{props.error}
									</Typography>
								</Paper>
							)}
						</div>
					</form>
					<div>
						<div
							style={{ margin: 20, display: 'flex', justifyContent: 'center' }}>
							<Typography>OR</Typography>
						</div>
						<GoogleButton
							onClick={() => {
								props.handleGoogleLogin();
							}}
						/>
						<div
							style={{ margin: 5, display: 'flex', justifyContent: 'center' }}>
							<Button className={classes.submit} onClick={props.handleRegister}>
								Register
							</Button>
						</div>
					</div>
				</Paper>
			</main>
		</div>
	);
};

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
