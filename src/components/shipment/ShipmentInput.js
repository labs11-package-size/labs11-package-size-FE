import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
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

class ShipmentInput extends Component {
	componentDidMount() {
		console.log(this.props);
	}
	render() {
		const { classes } = this.props;
		return (
			<form className={classes.container}>
				<Input
					placeholder="Product Name"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>

				<Input
					placeholder="Description"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>

				<Input
					placeholder="Height"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>

				<Input
					placeholder="Length"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>
				<Input
					placeholder="Depth"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>
				<Input
					placeholder="Weight"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>
				<Button size="small">Submit</Button>
			</form>
		);
	}
}

ShipmentInput.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShipmentInput);
