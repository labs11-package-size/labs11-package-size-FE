import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
import { getAuth } from '../store/actions/userActions';

class Routes extends Component {
	render() {
		let routes;

		if (this.props.isAuthenticated) {
			console.log('Authenticated routes');
			routes = (
				<Switch>
					<Redirect from="/login" to="/" />
					<Redirect from="/register" to="/" />
					<Route path="/logout" component={LogoutView} />
					<Route
						path="/shipments/form"
						render={props => <ShipmentInputView {...props} />}
					/>
					<Route
						path="/products/form"
						render={props => <ProductInputView {...props} />}
					/>
					<Route
						path="/shipments"
						render={props => <ShipmentListView {...props} />}
					/>
					<Route
						path="/products"
						render={props => <ProductListView {...props} />}
					/>
					<Route path="/account" render={props => <AccountView {...props} />} />
					<Route path="/" render={props => <DashboardView {...props} />} />
				</Switch>
			);
		} else {
			console.log('unauthenticated routes');
			routes = (
				<Switch>
					<Redirect exact from="/" to="/login" />
					<Route path="/login" component={LoginView} />
					<Route path="/signup" component={SignUpView} />
					<Redirect to="/login" />
				</Switch>
			);
		}

		return <div>{routes}</div>;
	}
}

const mapStateToProps = state => {
	console.log(state.userReducer.authenticated);
	return {
		isAuthenticated: state.userReducer.authenticated,
	};
};

export default connect(
	mapStateToProps,
	{ getAuth },
)(Routes);
