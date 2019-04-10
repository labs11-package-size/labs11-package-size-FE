import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect, Link } from 'react-router-dom';

import ShipmentList from '../../components/shipment/ShipmentList';
import {
	getShipments,
	addShipment,
	deleteShipment,
} from '../../store/actions/shipmentActions';

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

class ShipmentListView extends Component {
	componentDidMount() {
		this.props.getShipments();
	}

	addShipment = (tracId, prodId) => {
		this.props.addShipment(tracId, prodId);
		return <Redirect to="/" />;
	};

	deleteShipment = uuid => {
		this.props.deleteShipment(uuid.join());
		this.props.getShipments();
		return <Redirect to="/" />;
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<Typography gutterBottom variant="h5" component="h2">
					Shipments
				</Typography>
				{(this.props.shipments.length > 0) ? (
				<div>
					<ShipmentList
						addShipment={this.addShipment}
						deleteShipment={this.deleteShipment}
						shipments={this.props.shipments}
					/>
				</div>)
				: (<p>No shipments yet</p>)
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		shipments: state.shipmentsReducer.shipments,
	};
};

export default connect(
	mapStateToProps,
	{ getShipments, addShipment, deleteShipment },
)(withStyles(styles)(ShipmentListView));