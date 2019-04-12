import { combineReducers } from 'redux';
import userReducer from './userReducer';
import shipmentsReducer from './shipmentsReducer';
import productsReducer from './productsReducer';
import packageReducer from './packageReducer';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
	userReducer,
	shipmentsReducer,
	productsReducer,
	packageReducer,
	firebaseReducer,
});
