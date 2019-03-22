import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ProductListView from '../containers/productView/productInputView';
import ProductInputView from '../containers/productView/productInputView';
import LoginView from '../containers/loginView/LoginView';
import ShipmentInputView from '../containers/shipmentView/ShipmentInputView';
import ShipmentListView from '../containers/shipmentView/ShipmentListView';
import DashboardView from '../containers/dashboardView/DashboardView';

class Routes extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/login" component={LoginView} />
					<Route exact path="/shipments" component={ShipmentListView} />
					<Route exact path="/products" component={ProductListView} />
					<Route path="/shipments/form" component={ShipmentInputView} />
					<Route path="/products/form" component={ProductInputView} />
					{/* <Route path="/register" component={Register} /> */}
					<Route exact path="/" component={DashboardView} />
				</Switch>
			</div>
		);
	}
}

export default Routes;
