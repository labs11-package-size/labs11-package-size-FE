import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

import { firebase } from './firebase';

import rootReducer from './store/reducers/index';
import Routes from './routes/Routes';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirebase }), logger),
		reactReduxFirebase(firebase),
	),
);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Routes />
		</Router>
	</Provider>,
	document.getElementById('root'),
);
