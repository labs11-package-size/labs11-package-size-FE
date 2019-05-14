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

export const EDITING_USER = 'EDITING_USER';
export const EDITING_USER_SUCCESSFUL = 'EDITING_USER_SUCCESSFUL';
export const EDITING_USER_FAILURE = 'EDITING_USER_FAILURE';

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

export const googleLogin = () => dispatch => {
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
					dispatch({
						type: USER_LOGIN_SUCCESSFUL,
						payload: res.data.token,
						user,
					});
					localStorage.setItem('token', res.data.token);
				})
				.catch(err => console.log('error', err));
		})
		.catch(err => {
			dispatch({ type: USER_LOGIN_FAILURE, payload: err.data });
		});
};

export const emailLogin = credentials => dispatch => {
	const email = credentials.emailAddress.toString();
	const password = credentials.password.toString();
	dispatch({ type: USER_LOGGING_IN });
	firebase
		.auth()
		.fetchSignInMethodsForEmail(email)
		.then(res => {
			if (res[0] === 'google.com') {
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
								dispatch({
									type: USER_LOGIN_SUCCESSFUL,
									payload: res.data.token,
									user,
								});
								localStorage.setItem('token', res.data.token);
							})
							.catch(err => console.log('error', err));
					})
					.catch(err => {
						dispatch({ type: USER_LOGIN_FAILURE, payload: err.data });
					});
			} else {
				return firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
					.then(res => {
						const user = {
							uid: res.user.uid,
							email: res.user.email,
						};
						axios
							.post(`/users/login`, user)
							.then(res => {
								dispatch({
									type: USER_LOGIN_SUCCESSFUL,
									payload: res.data.token,
									user,
								});
								localStorage.setItem('token', res.data.token);
							})
							.catch(err => console.log('error', err));
					})
					.catch(err => {
						console.log(err);
						dispatch({ type: USER_LOGIN_FAILURE, payload: err.code });
					});
			}
		})
		.catch(err => console.log('firebase error', err));
};

export const register = credentials => dispatch => {
	const email = credentials.emailAddress.toString();
	const password = credentials.password.toString();
	const displayName = `${credentials.firstName} ${credentials.lastName}`;

	dispatch({ type: USER_LOGGING_IN });
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(res => {
			const user = {
				uid: res.user.uid,
				displayName: displayName,
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
			console.log(err);
			dispatch({ type: USER_LOGIN_FAILURE, payload: err.message });
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
			dispatch({ type: USER_LOGOUT_SUCCESSFUL });
			localStorage.removeItem('token');
		})
		.catch(err => {
			dispatch({ type: USER_LOGOUT_FAILURE });
			console.log('logout', err);
		});
};

export const getAccountInfo = () => dispatch => {
	dispatch({ type: GETTING_ACCOUNT });
	axios
		.get('users/accountinfo')
		.then(res => {
			dispatch({ type: GETTING_ACCOUNT_SUCCESSFUL, payload: res.data });
		})
		.catch(err =>
			dispatch({ type: GETTING_ACCOUNT_FAILURE, payload: err.data }),
		);
};

export const editUser = userInfo => dispatch => {
	dispatch({ type: EDITING_USER });
	axios
		.put('/users/accountinfo/edit', userInfo)
		.then(res => dispatch({ type: EDITING_USER_SUCCESSFUL }))
		.catch(res => ({ type: EDITING_USER_FAILURE }));
};

setInterval(function() {
	console.log('worked');
	getAuth();
}, 300000); // every 5 minutes (300000)

// export const register = newUser => dispatch => {
// 	dispatch({ type: USER_REGISTERING });
// 	axios
// 		.post(`users/register`, newUser)
// 		.then(res =>
// 			dispatch({ type: USER_REGISTER_SUCCESSFUL, payload: res.data }),
// 		)
// 		.catch(err => dispatch({ type: USER_REGISTER_FAILURE, payload: err }));
// };
