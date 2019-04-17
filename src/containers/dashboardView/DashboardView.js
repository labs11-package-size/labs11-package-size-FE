import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ProductListView from '../productView/ProductListView';
import { withStyles } from '@material-ui/core/styles';
import ShipmentListView from '../shipmentView/ShipmentListView';
import PackageTableView from '../packageTableView/PackageTableView';
import { getProducts } from '../../store/actions/productActions';
import { getShipments } from '../../store/actions/shipmentActions';
import { getPackages } from '../../store/actions/packageActions';

const styles = theme => ({
	root: {
		marginTop: 30,
	},
});

class DashboardView extends Component {
	async componentDidMount() {
		this.props.getProducts();
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className="">
					<div className="">
						<ProductListView products={this.props.products} />
					</div>
					<div className="">
						<ShipmentListView shipments={this.props.shipments} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		products: state.productsReducer.products,
		shipments: state.shipmentsReducer.shipments,
	};
};

export default compose(
	connect(
		mapStateToProps,
		{ getProducts, getShipments },
	),
)(withStyles(styles)(DashboardView));
