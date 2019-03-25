import {
	// USER_REGISTERING,
	// USER_REGISTER_SUCCESSFUL,
	// USER_REGISTER_FAILURE,
	USER_LOGGING_IN,
	USER_LOGIN_SUCCESSFUL,
	USER_LOGIN_FAILURE,
	USER_LOGGING_OUT,
	USER_LOGOUT_SUCCESSFUL,
	USER_LOGOUT_FAILURE,
	AUTHENTICATING_USER,
	AUTH_SUCCESSFUL,
	AUTH_FAILURE,
} from '../actions/userActions';

const initialState = {
	userToken: null,
	isLoggedIn: false,
	isLoggingOut: false,
	isLoggedOut: false,
	isLoggingIn: false,
	authenticating: false,
	authenticated: false,
	error: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGGING_IN:
			return { ...state, isLoggingIn: true, authenticating: true };
		case USER_LOGIN_SUCCESSFUL:
			return {
				...state,
				userToken: action.payload,
				isLoggedIn: true,
				isLoggingIn: false,
				authenticating: false,
				authenticated: true,
			};
		case USER_LOGIN_FAILURE:
			return {
				...state,
				userToken: null,
				isLoggedIn: false,
				authenticated: null,
				error: action.payload,
			};

		case AUTHENTICATING_USER:
			return { ...state, isLoggingIn: false, authenticating: true };
		case AUTH_SUCCESSFUL:
			return {
				...state,
				isLoggedIn: true,
				isLoggingIn: false,
				authenticated: action.payload,
			};
		case AUTH_FAILURE:
			return {
				...state,
				isLoggedIn: false,
				authenticated: false,
				error: action.payload,
			};

		case USER_LOGGING_OUT:
			return { ...state, isLoggingOut: true };
		case USER_LOGOUT_SUCCESSFUL:
			return {
				...state,
				userToken: null,
				isLoggedIn: false,
				isLoggingOut: false,
				isLoggedOut: false,
				isLoggingIn: false,
				authenticating: false,
				authenticated: false,
				error: null,
			};

		default:
			return state;
	}
};

export default userReducer;
