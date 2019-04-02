import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';

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

const Shipment = props => {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Avatar alt="" src="" className={classes.bigAvatar} />
					<div className={classes.column}>
						<Typography className={classes.heading}>
							Shipped To: {props.shipment.shippedTo}
						</Typography>

						<Typography className={classes.heading}>
							Shipping Date: {props.shipment.dateShipped}
						</Typography>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={classes.details}>
					<div className={classes.column} />
				</ExpansionPanelDetails>

				<ExpansionPanelActions>
					<div className={classes.column}>
						<Typography className={classes.heading}>
							Tracking Number: {props.shipment.trackingNumber}
						</Typography>
						<Typography className={classes.heading}>
							Carrier: {props.shipment.carrierName}
						</Typography>
						<Typography className={classes.heading}>
							Shipping Type: {props.shipment.shippingType}
						</Typography>
						<Typography className={classes.heading}>
							Status: {props.shipment.status}
						</Typography>
					</div>
					<Link to="/shipments/form">
						<Button size="small" color="primary">
							Edit Shipment Info
						</Button>
					</Link>
				</ExpansionPanelActions>
				<Button onClick={props.deleteShipment} size="small" color="primary">
					Delete Shipment
				</Button>
			</ExpansionPanel>
		</div>
	);
};

Shipment.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Shipment));
