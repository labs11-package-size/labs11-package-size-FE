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

class ProductAdd extends Component {
	componentDidMount() {}
	render() {
		const { classes } = this.props;
		return (
			<form className={classes.container}>
				<Input
					onChange={this.props.handleChange}
					name="name"
					value={this.props.product.name}
					label={this.props.product.name}
					placeholder="Product Name"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>

				<Input
					onChange={this.props.handleChange}
					name="description"
					value={this.props.product.productDescription}
					label={this.props.product.productDescription}
					placeholder="Description"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>

				<Input
					onChange={this.props.handleChange}
					name="height"
					value={this.props.product.height}
					label={this.props.product.height}
					placeholder="Height"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>

				<Input
					onChange={this.props.handleChange}
					name="length"
					value={this.props.product.length}
					label={this.props.product.length}
					placeholder="Length"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>
				<Input
					onChange={this.props.handleChange}
					name="value"
					value={this.props.product.value}
					label={this.props.product.value}
					placeholder="Value"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>
				<Input
					onChange={this.props.handleChange}
					name="weight"
					value={this.props.product.weight}
					label={this.props.product.weight}
					placeholder="Weight"
					className={classes.input}
					inputProps={{
						'aria-label': 'Description',
					}}
				/>
				<Button onClick={this.props.addProduct} size="small">
					Submit
				</Button>
			</form>
		);
	}
}

ProductAdd.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductAdd);
