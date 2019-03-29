import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	container: {
		margin: '20px auto',
		width: '500px',
		display: 'flex',
		flexDirection: 'column',
	},

	input: {
		margin: theme.spacing.unit,
	},
});

class Register extends Component {
	state = {
		user: {
			firstName: '',
			lastName: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zip: '',
			country: '',
			emailAddress: '',
		},
		//submitted: false
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		//this.setState({ submitted: true });
		this.props.register({
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			address1: this.state.address1,
			address2: this.state.address2,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip,
			country: this.state.country,
			emailAddress: this.state.emailAddress,
		});
		this.props.history.push('/dashboard');
	};

	render() {
		return (
			<div>
				<React.Fragment>
					<Typography variant="h6" gutterBottom>
						Please enter you name and address:
					</Typography>
					<form onSubmit={this.onSubmit} className="registration-form">
						<Grid container spacing={24}>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="firstName"
									name="firstName"
									label="First name"
									value={this.state.firstname}
									onChange={this.onChange}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="lastName"
									name="lastName"
									label="Last name"
									value={this.state.lastname}
									onChange={this.onChange}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									id="address1"
									name="address1"
									label="Address line 1"
									value={this.state.address1}
									onChange={this.onChange}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="address2"
									name="address2"
									label="Address line 2"
									value={this.state.address2}
									onChange={this.onChange}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="city"
									name="city"
									label="City"
									value={this.state.city}
									onChange={this.onChange}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="state"
									name="state"
									label="State/Province/Region"
									value={this.state.state} //whooooaaaaa
									onChange={this.onChange}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="zip"
									name="zip"
									label="Zip / Postal code"
									value={this.state.zip}
									onChange={this.onChange}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="country"
									name="country"
									label="Country"
									value={this.state.country}
									onChange={this.onChange}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="emailAddress"
									name="emailAddress"
									label="email address"
									value={this.state.emailAddress}
									onChange={this.onChange}
									fullWidth
								/>
							</Grid>

							<Button size="small">Submit</Button>
						</Grid>
					</form>
				</React.Fragment>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

export default connect(
	mapStateToProps,
	{},
)(withStyles(styles)(Register));
