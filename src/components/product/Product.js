import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
	root: {
		width: '100%',
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	icon: {
		verticalAlign: 'bottom',
		height: 20,
		width: 20,
	},
	details: {
		alignItems: 'center',
	},
	column: {
		flexBasis: '33.33%',
	},
	helper: {
		borderLeft: `2px solid ${theme.palette.divider}`,
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
});

function Product(props) {
	const { classes } = props;
	console.log(props.product);
	return (
		<div className={classes.root}>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<div className={classes.column}>
						<Typography className={classes.heading}>
							Product Name: {props.product.name}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography className={classes.heading}>
							Description: {props.product.productDescription}
						</Typography>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={classes.details}>
					<div className={classes.column} />
				</ExpansionPanelDetails>

				<ExpansionPanelActions>
					<div className={classes.column}>
						<Typography className={classes.heading}>
							Length: {props.product.length}
						</Typography>
						<Typography className={classes.heading}>
							Width: {props.product.width}
						</Typography>
						<Typography className={classes.heading}>
							Height: {props.product.height}
						</Typography>
						<Typography className={classes.heading}>
							Fragile: {props.product.fragile}
						</Typography>
						<Typography className={classes.heading}>
							Weight: {props.product.weight}
						</Typography>
						<Typography className={classes.heading}>
							Value: {props.product.value}
						</Typography>
					</div>
					<Link to="/shipments/form">
						<Button size="small">Add Shipment</Button>
					</Link>
					<Link to="/products/form">
						<Button size="small" color="primary">
							Edit
						</Button>
					</Link>
				</ExpansionPanelActions>
			</ExpansionPanel>
		</div>
	);
}

Product.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Product);
