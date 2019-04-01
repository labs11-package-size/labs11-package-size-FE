import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import Shipment from './Shipment';
import { getShipments } from '../../store/actions/shipmentActions';

const styles = {
	card: {
		maxWidth: 250,
		margin: 20,
	},
	media: {
		height: 140,
	},
	cardContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	mainContainer: {
		maxWidth: 1100,
	},
};

class ShipmentList extends Component {
	componentDidMount() {}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<Typography gutterBottom variant="h5" component="h2">
					Shipments
				</Typography>
				{!this.props.shipments ? ( 
					<h5>...loading</h5>
				) : (
					this.props.shipments.map(shipment => {
						return <Shipment key={shipment.identifier} shipment={shipment} />;
					})
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

export default connect(
	mapStateToProps,
	{ getShipments },
)(withStyles(styles)(ShipmentList));
