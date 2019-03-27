import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './store/reducers/index';
import Layout from './containers/layout/Layout';
import { firebase } from './firebase';

import './styles/css/index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, logger)),
);

firebase.auth().onAuthStateChanged(user => {
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<Layout auth={user} />
			</Router>
		</Provider>,
		document.getElementById('root'),
	);
});
