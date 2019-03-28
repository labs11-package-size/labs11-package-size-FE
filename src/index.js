import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
	syncHistoryWithStore,
	routerMiddleware,
	routerReducer,
} from 'react-router-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as rootReducer from './store/reducers/index';
import Layout from './containers/layout/Layout';
import { requireAuth } from './hoc/auth/Auth';

import './styles/css/index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	combineReducers({
		rootReducer,
		routing: routerReducer,
	}),
	composeEnhancers(
		applyMiddleware(routerMiddleware(createBrowserHistory(thunk, logger))),
	),
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

const secure = requireAuth(store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Layout secure={secure} />
		</Router>
	</Provider>,
	document.getElementById('root'),
);
