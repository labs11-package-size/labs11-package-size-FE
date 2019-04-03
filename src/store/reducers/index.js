import { combineReducers } from 'redux';

import userReducer from './userReducer';
import shipmentsReducer from './shipmentsReducer';
import productsReducer from './productsReducer';

export default combineReducers({
	userReducer,
	shipmentsReducer,
	productsReducer,
});
