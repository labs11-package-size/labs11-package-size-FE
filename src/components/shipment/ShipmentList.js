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
						{!this.props.shipments ? (
							<h5>...loading</h5>
						) : (
							this.props.shipments.map(shipment => {
								return (
									<Shipment
										key={shipment.uuid}
										deleteShipment={() =>
											this.props.deleteShipment(shipment.uuid)
										}
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
