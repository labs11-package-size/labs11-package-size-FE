import React, { Component } from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import { getAuth } from '../../store/actions/userActions';
import { getProducts } from '../../store/actions/productActions';
import { getShipments } from '../../store/actions/shipmentActions';
import { connect } from 'react-redux';

class DashboardView extends Component {
	componentDidMount() {
		this.props.getAuth();
		this.props.getProducts();
		this.props.getShipments();
	}
	render() {
		return (
			<div>
				<Dashboard
					shipments={this.props.shipments}
					products={this.props.products}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.userReducer.userInfo,
		isLoggedIn: state.userReducer.isLoggedIn,
		shipments: state.shipmentsReducer.shipments,
		products: state.productsReducer.products,
	};
};

export default connect(
	mapStateToProps,
	{ getAuth, getProducts, getShipments },
)(DashboardView);
