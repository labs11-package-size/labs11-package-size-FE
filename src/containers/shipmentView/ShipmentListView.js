import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ShipmentList from '../../components/shipment/ShipmentList';
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

class ShipmentListView extends Component {
	componentDidMount() {
		this.props.getShipments();
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<Typography gutterBottom variant="h5" component="h2">
					Shipments
				</Typography>
				<ShipmentList shipments={this.props.shipments} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		shipments: state.shipmentReducer.shipments,
	};
};

export default connect(
	mapStateToProps,
	{ getShipments },
)(withStyles(styles)(ShipmentListView));
