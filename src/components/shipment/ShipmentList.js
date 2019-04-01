import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Shipment from './Shipment';

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

export default withStyles(styles)(ShipmentList);
