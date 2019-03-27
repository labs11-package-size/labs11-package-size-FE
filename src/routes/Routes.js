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

const PrivateRoute = ({ isLoggedIn, component: Comp, ...rest }) => {
	console.log(isLoggedIn);
	return (
		<Route
			{...rest}
			component={props =>
				isLoggedIn ? <Comp {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};
class Routes extends Component {
	render() {
		let routes;
		console.log(this.props.isLoggedIn);
		if (this.props.isLoggedIn) {
			routes = (
				<Switch>
					<PrivateRoute
						exact
						isLoggedIn={this.props.isLoggedIn}
						path="/logout"
						component={LogoutView}
					/>
					<PrivateRoute
						exact
						isLoggedIn={this.props.isLoggedIn}
						path="/shipments/form"
						component={ShipmentInputView}
					/>
					<PrivateRoute
						exact
						isLoggedIn={this.props.isLoggedIn}
						path="/products/form"
						component={ProductInputView}
					/>
					<PrivateRoute
						exact
						isLoggedIn={this.props.isLoggedIn}
						path="/shipments"
						component={ShipmentListView}
					/>
					<PrivateRoute
						exact
						isLoggedIn={this.props.isLoggedIn}
						path="/products"
						component={ProductListView}
					/>
					<PrivateRoute
						exact
						isLoggedIn={this.props.isLoggedIn}
						path="/account"
						component={AccountView}
					/>
					<PrivateRoute
						exact
						isLoggedIn={this.props.isLoggedIn}
						path="/"
						component={DashboardView}
					/>
				</Switch>
			);
		} else {
			routes = (
				<Switch>
					<Route
						exact
						isLoggedIn={this.props.isLoggedIn}
						path="/login"
						component={LoginView}
					/>
					<Route
						exact
						isLoggedIn={this.props.isLoggedIn}
						path="/register"
						component={RegisterView}
					/>
				</Switch>
			);
		}

		return <div>{routes}</div>;
	}
}

export default Routes;
