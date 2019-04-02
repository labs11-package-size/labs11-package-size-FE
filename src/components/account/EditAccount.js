import React from 'react';
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

const EditAccount = props => {
	const { classes } = props;
	const handleClick = event => {
		event.preventDefault();
		props.handleEditSubmit();
		props.history.push('/Account');
	};

	return (
		<form className={classes.container}>
			<Input
				onChange={props.handleChange}
                name="Display Name"
                value={props.userInfo.displayName}
				placeholder="Display Name"
				className={classes.input}
				inputProps={{
					'aria-label': 'Description',
				}}
			/>
            <Input
				onChange={props.handleChange}
                name="Email Address"
                value={props.userInfo.email}
				placeholder="Email Address"
				className={classes.input}
				inputProps={{
					'aria-label': 'Description',
				}}
			/>

			<Button onClick={props.editUser} size="small">
				Submit
			</Button>
		</form>
	);
};

EditAccount.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EditAccount));