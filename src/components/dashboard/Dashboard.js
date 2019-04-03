import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import ProductListView from '../../containers/productView/ProductListView';
import { getProducts } from '../../store/actions/productActions';
import { getShipments } from '../../store/actions/shipmentActions';
import ShipmentListView from '../../containers/shipmentView/ShipmentListView';

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

class Dashboard extends Component {
	render() {
		console.log(this.props);
		return (
			<div className={this.props.classes.mainContainer}>
				<ProductListView products={this.props.products} />
				<ShipmentListView shipments={this.props.shipments} />
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
