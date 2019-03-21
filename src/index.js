import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './store/reducers/index';
import Layout from './containers/layout/Layout';

import './styles/css/index.css';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Layout />
		</Router>
	</Provider>,
	document.getElementById('root'),
);
