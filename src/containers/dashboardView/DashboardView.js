import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ProductListView from '../productView/ProductListView';
import ShipmentListView from '../shipmentView/ShipmentListView';
import { getProducts } from '../../store/actions/productActions';
import { getShipments } from '../../store/actions/shipmentActions';

class DashboardView extends Component {
	componentWillMount() {
		this.props.getProducts();
		this.props.getShipments();
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
)(DashboardView);
