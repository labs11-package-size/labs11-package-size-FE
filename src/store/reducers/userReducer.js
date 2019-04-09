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
	AUTH_ERROR,
	GETTING_ACCOUNT,
	GETTING_ACCOUNT_SUCCESSFUL,
	GETTING_ACCOUNT_FAILURE,
	EDITING_USER,
	EDITING_USER_SUCCESSFUL,
	EDITING_USER_FAILURE,
} from '../actions/userActions';

const initialState = {
	userToken: null,
	isLoggedIn: false,
	isLoggingOut: false,
	isLoggedOut: false,
	isLoggingIn: false,
	authenticating: false,
	authenticated: false,
	userInfo: null,
	gettingUserInfo: false,
	gotUserInfo: false,
	registering: false,
	editingUserInfo: false,
	editingUserInfoSuccess: false,
	editingUserInfoFailure: false,
	error: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGGING_IN:
			return {
				...state,
				isLoggingIn: true,
				authenticating: true,
			};
		case USER_LOGIN_SUCCESSFUL:
			return {
				...state,
				userToken: action.payload,
				userInfo: action.user,
				isLoggedIn: true,
				authenticated: true,
				isLoggingIn: false,
				authenticating: false,
			};
		case USER_LOGIN_FAILURE:
			return {
				...state,
				userToken: null,
				authenticated: false,
				isLoggedIn: false,
				error: action.payload,
			};

		case AUTHENTICATING_USER:
			return {
				...state,
				isLoggedIn: true,
				isLoggingIn: false,
				authenticating: true,
			};
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
				authenticated: action.payload,
			};
		case AUTH_ERROR:
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
		case USER_LOGOUT_FAILURE:
			return { ...state, error: action.payload };

		case GETTING_ACCOUNT:
			return {
				isLoggedIn: true,
				gettingUserInfo: true,
				gotUserInfo: false,
				error: null,
			};
		case GETTING_ACCOUNT_SUCCESSFUL:
			return {
				...state,
				userInfo: action.payload,
				gettingUserInfo: false,
				gotUserInfo: true,
				error: null,
			};
		case GETTING_ACCOUNT_FAILURE:
			return {
				...state,
				isLoggedIn: true,
				gettingUserInfo: false,
				gotUserInfo: false,
				error: action.payload,
			};

		case EDITING_USER:
			return {
				...state,
				editingUserInfo: true,
				editingUserInfoSuccess: false,
				editingUserInfoFailure: false,
			};
		case EDITING_USER_SUCCESSFUL:
			return {
				...state,
				userInfo: action.payload,
				editingUserInfo: false,
				editingUserInfoSuccess: true,
				editingUserInfoFailure: false,
			};
		case EDITING_USER_FAILURE:
			return {
				...state,
				editingUserInfo: false,
				editingUserInfoSuccess: false,
				editingUserInfoFailure: true,
				error: action.payload,
			};

		default:
			return state;
	}
};

// 		case USER_REGISTERING:
// 			return {
// 				...state,
// 				isLoggingIn: true,
// 				isLoggedOut: false,
// 				authenticating: true,
// 				registering: true,
// 			};
// 		case USER_REGISTER_SUCCESSFUL:
// 			return {
// 				...state,
// 				userToken: action.payload,
// 				isLoggedIn: true,
// 				isLoggingOut: false,
// 				isLoggedOut: false,
// 				isLoggingIn: false,
// 				authenticating: false,
// 				authenticated: true,
// 				error: null,
// 			};
// 		case USER_REGISTER_FAILURE:
// 			return {
// 				...state,
// 				userToken: null,
// 				isLoggedIn: false,
// 				isLoggingOut: false,
// 				isLoggedOut: true,
// 				isLoggingIn: false,
// 				authenticating: false,
// 				authenticated: false,
// 				error: action.payload,
// 			};

export default userReducer;
