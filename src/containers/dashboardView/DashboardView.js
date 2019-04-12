import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ProductListView from '../productView/ProductListView';
import ShipmentListView from '../shipmentView/ShipmentListView';
import PackageTableView from '../packageTableView/PackageTableView';
import { getProducts } from '../../store/actions/productActions';
import { getShipments } from '../../store/actions/shipmentActions';
import { getPackages } from '../../store/actions/packageActions';

class DashboardView extends Component {
	async componentDidMount() {
		this.props.getProducts();
		this.props.getShipments();
		this.props.getPackages();
	}
	
	render() {
		return (
			<div className="">
				<div className="">
					<div className="">
						<ProductListView products={this.props.products} />
					</div>
					<div className="">
						<ShipmentListView shipments={this.props.shipments} />
					</div>
					<div className="">
						<PackageTableView shipments={this.props.packages} />
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
		packages: state.packageReducer.packages
	};
};

export default compose(
	connect(
		mapStateToProps,
		{ getProducts, getShipments, getPackages },
	),
)(DashboardView);
