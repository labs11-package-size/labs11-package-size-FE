import axios from 'axios';

export const USER_REGISTERING = 'USER_REGISTERING';
export const USER_REGISTER_SUCCESSFUL = 'USER_REGISTER_SUCCESSFUL';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export const USER_LOGGING_IN = 'USER_LOGGING_IN';
export const USER_LOGIN_SUCCESSFUL = 'USER_LOGIN_SUCCESSFUL';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const USER_LOGGING_OUT = 'USER_LOGGING_OUT';
export const USER_LOGOUT_SUCCESSFUL = 'USER_LOGOUT_SUCCESSFUL';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export const loginUser = userInfo => dispatch => {
	dispatch({ type: USER_LOGGING_IN });
	axios
		.post('https://scannar-be.herokuapp.com/api/users/login', userInfo)
		.then(res => {
			dispatch({ type: USER_LOGIN_SUCCESSFUL, payload: res.data });
		})
		.catch(err => {
			dispatch({ type: USER_LOGIN_FAILURE, payload: err.data });
		});
};

// export const logoutUser = stats => {
// 	console.log(stats);
// 	localStorage.removeItem('user');

// 	return {
// 		type: 'USER_LOGOUT',
// 		payload: stats,
// 	};
// };

// export const userRegister = userStats => {
// 	return {
// 		type: 'USER_REGISTER',
// 		payload: userStats,
// 	};
// };

// export const addUser = user => {
// 	return {
// 		type: ADD_USER,
// 		payload: user,
// 	};
// };
