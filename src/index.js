import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import PackagingView from "./containers/packagingView/PackagingView"
import rootReducer from './store/reducers/index';
import Layout from './containers/layout/Layout';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<PackagingView />
		</Router>
	</Provider>,
	document.getElementById('root'),
);
