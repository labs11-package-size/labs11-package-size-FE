import React, { Component } from 'react';
import './styles/css/App.css';
import LoginView from './containers/loginView/LoginView';
import ProductListView from './containers/productView/ProductListView';

class App extends Component {
	render() {
		return (
			<div className="App">
				{/* <LoginView /> */}
				<ProductListView />
			</div>
		);
	}
}

export default App;
