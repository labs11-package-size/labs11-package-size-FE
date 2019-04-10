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
	state = {
		searchTerm: '',
		filteredShipments: "",
		searching: false
	}
	componentDidMount() {
		return this.props.shipments;
	}

	addShipment = (tracId, prodId) => {
		this.props.addShipment(tracId, prodId);
		return <Redirect to="/" />;
	};

	deleteShipment = uuid => {
		this.props.deleteShipment(uuid);
		this.props.getShipments();
		return <Redirect to="/" />;
	};

	filterShipments = (e) => {
		e.preventDefault();
		this.setState({ searching: true, filteredShipments: this.props.shipments.filter(shipment => {
			return (
				shipment.shippedTo
				.toLowerCase()
				.indexOf(this.state.searchTerm.toLowerCase()) !== -1
			)
		})
	})}

	clearSearch = () => {
		this.setState({ filteredShipments: "", searching: false })
	}

	handleChanges = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<Typography gutterBottom variant="h5" component="h2">
					Shipments
				</Typography>
				<div>
					<ShipmentList
						addShipment={this.addShipment}
						deleteShipment={this.deleteShipment}
						shipments={(this.state.filteredShipments.length > 0) ? (this.state.filteredShipments) : (this.props.shipments)}
						searchTerm={this.state.searchTerm}
						filterShipments={this.filterShipments}
						filteredShipments={this.state.filteredShipments}
						handleChanges={this.handleChanges}
						clearSearch={this.clearSearch}
						searching={this.state.searching}
					/>
				</div>
			</div>
		);
	}
}


export default connect(
	null,
	{ getShipments, addShipment, deleteShipment },
)(withStyles(styles)(ShipmentListView));
