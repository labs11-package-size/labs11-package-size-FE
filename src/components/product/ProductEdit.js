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

const ProductEdit = props => {
	const { classes } = props;
	const handleClick = event => {
		event.preventDefault();
		if (props.isEditing) {
			props.handleEditSubmit();
		} else {
			props.addProduct();
		}
		props.history.push('/');
	};

	return (
		<form className={classes.container}>
			<Input
				onChange={props.handleChange}
				name="name"
				// value={props.product.name}
				placeholder="Product Name"
				className={classes.input}
				inputProps={{
					'aria-label': 'Description',
				}}
			/>

			<Input
				onChange={props.handleChange}
				name="description"
				value={props.product.productDescription}
				placeholder="Description"
				className={classes.input}
				inputProps={{
					'aria-label': 'Description',
				}}
			/>

			<Input
				onChange={props.handleChange}
				name="height"
				// value={props.product.height}
				placeholder="Height"
				className={classes.input}
				inputProps={{
					'aria-label': 'Description',
				}}
			/>

			<Input
				onChange={props.handleChange}
				name="length"
				// value={props.product.length}
				placeholder="Length"
				className={classes.input}
				inputProps={{
					'aria-label': 'Description',
				}}
			/>
			<Input
				onChange={props.handleChange}
				name="value"
				value={props.product.value}
				placeholder="Value"
				className={classes.input}
				inputProps={{
					'aria-label': 'Description',
				}}
			/>
			<Input
				onChange={props.handleChange}
				name="weight"
				value={props.product.weight}
				placeholder="Weight"
				className={classes.input}
				inputProps={{
					'aria-label': 'Description',
				}}
			/>
			<Button onClick={props.editProduct} size="small">
				Submit
			</Button>
		</form>
	);
};

ProductEdit.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ProductEdit));
