import { combineReducers } from 'redux';

import userReducer from './userReducer';
import shipmentReducer from './shipmentReducer';
import productReducer from './productReducer';

export default combineReducers({
	userReducer,
	shipmentReducer,
	productReducer,
});
