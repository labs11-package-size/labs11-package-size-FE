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
		filter: true,
		filteredList: [],
	};

	handleFilter = () => {
		this.setState(
			{
				filter: this.state.filter === false ? true : false,
			},
			() => this.handleRenderList(),
		);
	};

	handleRenderList = () => {
		if (this.state.filter === false) {
			this.setState(
				{
					filteredList: this.props.shipments.filter(shipment => {
						return shipment.tracked !== 0;
					}),
				},
				() => console.log(this.state.filteredList),
			);
		} else {
			this.setState(
				{
					filteredList: this.props.shipments.filter(shipment => {
						return shipment.tracked !== 1;
					}),
				},
				() => console.log(this.state.filteredList),
			);
		}
	};

	componentDidMount() {
		this.props.getShipments();
		this.setState({ filteredList: this.props.shipments });
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
							filter={this.handleFilter}
							previousPage={this.state.previousPage}
							previousRowsPerPage={this.state.previousRowsPerPage}
							addShipment={this.addShipment}
							deleteShipment={this.deleteShipment}
							shipments={this.state.filteredList}
						/>
					</div>
				) : (
					<ShipmentList
						filter={this.handleFilter}
						previousPage={this.state.previousPage}
						previousRowsPerPage={this.state.previousRowsPerPage}
						addShipment={this.addShipment}
						deleteShipment={this.deleteShipment}
						shipments={this.state.filteredList}
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
