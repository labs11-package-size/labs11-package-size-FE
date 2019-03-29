import React from 'react';
import axios from 'axios';
import { firebase, googleAuth } from '../../firebase';
import { Redirect } from 'react-router-dom';

export const USER_REGISTERING = 'USER_REGISTERING';
export const USER_REGISTER_SUCCESSFUL = 'USER_REGISTER_SUCCESSFUL';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export const GETTING_ACCOUNT = 'GETTING_ACCOUNT';
export const GETTING_ACCOUNT_SUCCESSFUL = 'GETTING_ACCOUNT_SUCCESSFUL';
export const GETTING_ACCOUNT_FAILURE = 'GETTING_ACCOUNT_FAILURE';

export const USER_LOGGING_IN = 'USER_LOGGING_IN';
export const USER_LOGIN_SUCCESSFUL = 'USER_LOGIN_SUCCESSFUL';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const USER_LOGGING_OUT = 'USER_LOGGING_OUT';
export const USER_LOGOUT_SUCCESSFUL = 'USER_LOGOUT_SUCCESSFUL';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export const AUTHENTICATING_USER = 'AUTHENTICATING_USER';
export const AUTH_SUCCESSFUL = 'AUTH_SUCCESSFUL';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_ERROR = 'AUTH_ERROR';

axios.defaults.baseURL = 'https://scannarserver.herokuapp.com/api';
axios.interceptors.request.use(
	function(options) {
		options.headers.authorization = localStorage.getItem('token');

		return options;
	},
	function(error) {
		return Promise.reject(error);
	},
);

export const loginUser = () => dispatch => {
	dispatch({ type: USER_LOGGING_IN });
	firebase
		.auth()
		.signInWithPopup(googleAuth)
		.then(res => {
			const user = {
				uid: res.user.uid,
				displayName: res.user.displayName,
				email: res.user.email,
			};
			axios
				.post(`/users/login`, user)
				.then(res => {
					dispatch({ type: USER_LOGIN_SUCCESSFUL, payload: res.data.token });
					localStorage.setItem('token', res.data.token);
				})
				.catch(err => console.log('error', err));
		})
		.catch(err => {
			dispatch({ type: USER_LOGIN_FAILURE, payload: err.data });
		});
};

export const getAuth = () => dispatch => {
	dispatch({ type: AUTHENTICATING_USER });

	axios
		.get(`/users/checkauth`)
		.then(res => {
			if (res.data === false) {
				dispatch({ type: AUTH_FAILURE, payload: res.data });
			} else {
				dispatch({ type: AUTH_SUCCESSFUL, payload: res.data });
			}
		})
		.catch(err => dispatch({ type: AUTH_ERROR, payload: err }));
};

export const logoutUser = () => dispatch => {
	dispatch({ type: USER_LOGGING_OUT });
	firebase
		.auth()
		.signOut()
		.then(res => {
			dispatch({ type: AUTH_SUCCESSFUL });
			console.log('logout res', res);
			localStorage.removeItem('token');
			return <Redirect to="/login" />;
		})
		.catch(err => {
			dispatch({ type: AUTH_FAILURE });
			console.log('logout', err);
		});
};

// export const register = newUser => dispatch => {
// 	dispatch({ type: USER_REGISTERING });
// 	axios
// 		.post(`${baseURL}/register`, newUser)
// 		.then(res =>
// 			dispatch({ type: USER_REGISTER_SUCCESSFUL, payload: res.data }),
// 		)
// 		.catch(err => dispatch({ type: USER_REGISTER_FAILURE, payload: err }));
// };

// export const getAccountInfo = () => dispatch => {
// 	dispatch({ type: GETTING_ACCOUNT });
// 	axios
// 		.get(`${baseURL}/accountinfo`)
// 		.then(res =>
// 			dispatch({ type: GETTING_ACCOUNT_SUCCESSFUL, payload: res.data }),
// 		)
// 		.catch(err =>
// 			dispatch({ type: GETTING_ACCOUNT_FAILURE, payload: err.data }),
// 		);
// };
