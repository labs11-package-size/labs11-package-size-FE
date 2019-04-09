import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Redirect, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Shipment from './Shipment';

const styles = theme => ({
	root: {
		width: 'auto',
		display: 'flex',
		flexWrap: 'wrap',
	},
	container: {
		margin: 40,
		flexDirection: 'column',
		display: 'flex',
	},
});

class ShipmentList extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.container}>
				<Typography gutterBottom variant="h5" component="h2">
					Shipments
				</Typography>
				<div>
					<input placeholder="search" label="search" type="text" />
					<Button variant="contained" className={classes.submit} size="small">
						<Link to="/shipment/add">Add Shipments</Link>
					</Button>
					<div className={classes.root}>
						{!this.props.shipments ? ( //shipments plural
							<h5>...loading</h5>
						) : (
							this.props.shipments.map(shipment => {
								//shipments plural
								return (
									<Shipment
										deleteShipment={() =>
											this.props.deleteShipment(shipment.uuid)
										}
										key={shipment.identifier}
										shipment={shipment}
									/>
								);
							})
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(ShipmentList));
