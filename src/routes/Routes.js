import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductListView from '../components/product/ProductList';
import ProductAddView from '../containers/productView/productAddView';
import ProductEditView from '../containers/productView/ProductEditView';
import LoginView from '../containers/loginView/LoginView';
import ShipmentAddView from '../containers/shipmentView/ShipmentAddView';
import ShipmentEditView from '../containers/shipmentView/ShipmentEditView';
import ShipmentListView from '../containers/shipmentView/ShipmentListView';
import DashboardView from '../containers/dashboardView/DashboardView';
import AccountView from '../containers/accountView/AccountView';
import LogoutView from '../containers/logoutView/LogoutView';
import { connect } from 'react-redux';

class Routes extends Component {
	render() {
		let routes;

		if (this.props.isLoggedIn) {
			routes = (
				<Switch>
					<Redirect from="/login" to="/" />
					<Redirect from="/register" to="/" />
					<Route exact path="/logout" component={LogoutView} />
					<Route exact path="/shipment/add" component={ShipmentAddView} />
					<Route exact path="/product/add" component={ProductEditView} />
					<Route exact path="/product/edit" component={ProductAddView} />
					<Route exact path="/shipments" component={ShipmentListView} />
					<Route exact path="/products" component={ProductListView} />
					<Route exact path="/account" component={AccountView} />
					<Route exact path="/" component={DashboardView} />
				</Switch>
			);
		} else {
			routes = (
				<Switch>
					<Redirect exact from="/" to="/login" />

					<Route exact path="/login" component={LoginView} />
					<Redirect to="/login" />
				</Switch>
			);
		}

		return <div>{routes}</div>;
	}
}
const mapStateToProps = state => {
	return {
		isLoggedIn: state.userReducer.isLoggedIn,
	};
};

export default connect(
	mapStateToProps,
	{},
)(Routes);
