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
	mainContainer: {
		marginTop: 45,
		marginBottom: 60,
	},
	heading: {
		marginBottom: 40,
	},
};

class ShipmentListView extends Component {
	state = {
		previousPage: null,
		previousRowsPerPage: null,
	};

	componentDidMount() {
		this.props.getShipments();
	}

	addShipment = (tracId, prodId) => {
		this.props.addShipment(tracId, prodId);
		return <Redirect to="/" />;
	};

	deleteShipment = (uuid, currentPage, currentRowsPerPage) => {
		this.setState(
			{ previousPage: currentPage, previousRowsPerPage: currentRowsPerPage },
			() => this.props.deleteShipment(uuid.join()),
		);
		return <Redirect to="/" />;
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<Typography
					className={classes.heading}
					gutterBottom
					variant="h5"
					component="h2">
					Shipments
				</Typography>
				{this.props.shipments.length > 0 ? (
					<div>
						<ShipmentList
							previousPage={this.state.previousPage}
							previousRowsPerPage={this.state.previousRowsPerPage}
							addShipment={this.addShipment}
							deleteShipment={this.deleteShipment}
							shipments={this.props.shipments}
						/>
					</div>
				) : (
					<ShipmentList
						addShipment={this.addShipment}
						deleteShipment={this.deleteShipment}
						shipments={this.props.shipments}
					/>
				)}
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
