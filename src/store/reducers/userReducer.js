import {
	USER_REGISTERING,
	USER_REGISTER_SUCCESSFUL,
	USER_REGISTER_FAILURE,
	USER_LOGGING_IN,
	USER_LOGIN_SUCCESSFUL,
	USER_LOGIN_FAILURE,
	USER_LOGGING_OUT,
	USER_LOGOUT_SUCCESSFUL,
	USER_LOGOUT_FAILURE,
} from '../actions/userActions';

const initialState = {
	userToken: null,
	isLoggedIn: false,
	isLoggingIn: false,
	error: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGGING_IN:
			return { ...state, isLoggingIn: true };
		case USER_LOGIN_SUCCESSFUL:
			return {
				...state,
				userToken: action.payload,
				isLoggedIn: true,
				isLoggingIn: false,
			};
		case USER_LOGIN_FAILURE:
			return {
				...state,
				userToken: null,
				isLoggedIn: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default userReducer;
