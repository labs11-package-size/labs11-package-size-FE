import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ProductListView from '../containers/productView/ProductListView';
import ProductInputView from '../containers/productView/productInputView';
import LoginView from '../containers/loginView/LoginView';
import ShipmentInputView from '../containers/shipmentView/ShipmentInputView';
import ShipmentListView from '../containers/shipmentView/ShipmentListView';

class Routes extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/login" component={LoginView} />
					<Route path="/shipments" component={ShipmentListView} />
					<Route path="/shipments/form" component={ShipmentInputView} />
					<Route path="/products" component={ProductListView} />
					<Route path="/products/form" component={ProductInputView} />
					{/* <Route path="/register" component={Register} />
					<Route path="/logout" component={Logout} /> */}
				</Switch>
			</div>
		);
	}
}

export default Routes;
