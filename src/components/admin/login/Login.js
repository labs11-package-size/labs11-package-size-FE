import React, { Component } from 'react';
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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
		color: 'white',
		backgroundColor: '#72BDA2',
		'&:hover': {
			color: '#72BDA2',
			backgroundColor: 'white',
		},
	},
});

class Login extends Component {
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
							Sign in
						</Typography>
						<h4 style={{ color: 'red' }}>
							{this.props.error === 'auth/user-not-found' && 'User not found'}
						</h4>
						<ValidatorForm
							className={classes.form}
							ref="form"
							onSubmit={this.props.handleEmailLogin}>
							<FormControl margin="normal" required fullWidth>
								<TextValidator
									label="Email"
									onChange={this.props.handleInputChange}
									name="emailAddress"
									value={this.props.email}
									validators={['required', 'isEmail']}
									errorMessages={[
										'this field is required',
										'email is not valid',
									]}
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<TextValidator
									label="Password"
									type="password"
									onChange={this.props.handleInputChange}
									name="password"
									value={this.props.password}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
							</FormControl>
							<br />
							<Button
								disabled={this.props.submitted}
								type="submit"
								fullWidth
								variant="contained"
								className={classes.submit}>
								{(this.props.submitted && 'Your form is submitted!') ||
									(!this.props.submitted && 'Sign in')}
							</Button>
							<div
								style={{
									margin: 5,
									display: 'flex',
									justifyContent: 'center',
								}}>
								<Button
									variant="contained"
									className={classes.submit}
									onClick={this.props.handleRegister}>
									Click to register
								</Button>
							</div>
						</ValidatorForm>

						<div>
							<div
								style={{
									margin: 20,
									display: 'flex',
									justifyContent: 'center',
								}}>
								<Typography>OR</Typography>
							</div>
							<GoogleButton
								style={{
									backgroundColor: '#72BDA2',
									'&:hover': {
										color: '#72BDA2',
										backgroundColor: 'white',
									},
								}}
								onClick={() => {
									this.props.handleGoogleLogin();
								}}
							/>
						</div>
					</Paper>
				</main>
			</div>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
