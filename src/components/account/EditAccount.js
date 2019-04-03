import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

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

class EditAccount extends Component {
	state = {
		displayName: '',
		email: '',
	};
	
	// componentDidMount() {
	// 	if (this.props.user) {
	// 		const { displayName, email } = this.props.user;
	// 		this.setState({ displayName, email});
	// 	}
	// };

	// handleInputChange = e => {
	// 	this.setState({ [e.target.name]: e.value.name })
	// };

	// handleFormSubmit = e => {
	// 	e.preventDefault();
	// 	const { displayName, email } = this.state;
	// 	this.props.editUser({ displayName, email });
	// };

	render() {
		const { classes } = this.props;
		const { displayName, email } = this.state;
		return (
			<form onSubmit={this.handFormSubmit} className={classes.container}>
				<Input
					type="text"
					name="Display Name"
					placeholder="Display Name"
					onChange={this.handleInputChange}
					value={displayName}
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>
				<Input
					type="text"
					name="Email Address"
					placeholder="Email Address"
					onChange={this.handleInputChange}
					value={email}
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>

				<Button size="small">
					Save
				</Button>
			</form>
		);
	};
};

EditAccount.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EditAccount));