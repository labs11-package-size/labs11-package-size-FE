import React from 'react';
import App from '../App';
import ProductListView from '../containers/productView/ProductListView';
import ProductInputView from '../containers/productView/productInputView';
import LoginView from '../containers/loginView/LoginView';
import ShipmentInputView from '../containers/shipmentView/ShipmentInputView';
import ShipmentListView from '../containers/shipmentView/ShipmentListView';
const Routes = () => {
	return (
		<div>
			<App />
			<LoginView />
			{/* <ProductListView /> */}
			{/* <ShipmentInputView /> */}
			{/* <ProductInputView /> */}
			{/* <ShipmentListView /> */}
		</div>
	);
};

export default Routes;
