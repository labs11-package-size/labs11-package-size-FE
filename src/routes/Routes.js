import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductListView from '../components/product/ProductList';
import ProductInputView from '../containers/productView/productInputView';
import LoginView from '../containers/loginView/LoginView';
import ShipmentInputView from '../containers/shipmentView/ShipmentInputView';
import ShipmentListView from '../containers/shipmentView/ShipmentListView';
import DashboardView from '../containers/dashboardView/DashboardView';
import RegisterView from '../containers/registerView/RegisterView';
import AccountView from '../containers/accountView/AccountView';
import LogoutView from '../containers/logoutView/LogoutView';

class Routes extends Component {
	render() {
		let routes;

		if (this.props.user) {
			console.log(this.props.user, 'is Logged in');
			routes = (
				<Switch>
					<Route
						exact
						isLoggedIn={this.props.user}
						path="/logout"
						component={LogoutView}
					/>
					<Route
						exact
						isLoggedIn={this.props.user}
						path="/shipments/form"
						component={ShipmentInputView}
					/>
					<Route
						exact
						isLoggedIn={this.props.user}
						path="/products/form"
						component={ProductInputView}
					/>
					<Route
						exact
						isLoggedIn={this.props.user}
						path="/shipments"
						component={ShipmentListView}
					/>
					<Route
						exact
						isLoggedIn={this.props.user}
						path="/products"
						component={ProductListView}
					/>
					<Route
						exact
						isLoggedIn={this.props.user}
						path="/account"
						component={AccountView}
					/>
					<Route
						exact
						isLoggedIn={this.props.user}
						path="/"
						component={DashboardView}
					/>
				</Switch>
			);
		} else {
			console.log(this.props.user, 'is not Logged in');
			routes = (
				<Switch>
					<Route exact path="/login" component={LoginView} />
					<Route exact path="/register" component={RegisterView} />
				</Switch>
			);
		}

		return <div>{routes}</div>;
	}
}

export default Routes;
