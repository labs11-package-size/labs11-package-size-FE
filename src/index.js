import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { firebase } from './firebase';

import rootReducer from './store/reducers/index';
import Layout from './containers/layout/Layout';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Layout />
		</Router>
	</Provider>,
	document.getElementById('root'),
);

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		console.log('Logged in', user);
	} else {
		console.log('logged out', user);
	}
});
