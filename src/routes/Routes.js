import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ProductListView from '../components/product/ProductList';
import ProductInputView from '../containers/productView/productInputView';
import LoginView from '../containers/loginView/LoginView';
import ShipmentInputView from '../containers/shipmentView/ShipmentInputView';
import ShipmentListView from '../containers/shipmentView/ShipmentListView';
import DashboardView from '../containers/dashboardView/DashboardView';
import SignUpView from '../containers/signUpView/SignUpView';
import AccountView from '../containers/accountView/AccountView';
import LogoutView from '../containers/logoutView/LogoutView';

class Routes extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/shipments/form" component={ShipmentInputView} />
					<Route path="/products/form" component={ProductInputView} />
					{/* <Route path="/register" component={Register} /> */}
					<Route path="/shipments" component={ShipmentListView} />
					<Route path="/products" component={ProductListView} />
					<Route path="/login" component={LoginView} />
					<Route path="/logout" component={LogoutView} />
					<Route path="/signup" component={SignUpView} />
					<Route path="/account" component={AccountView} />
					<Route path="/" component={DashboardView} />
				</Switch>
			</div>
		);
	}
}

export default Routes;
