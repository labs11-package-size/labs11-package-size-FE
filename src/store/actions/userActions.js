export const ADD_USER = 'ADD_USER';

export const loginUser = stats => {
	localStorage.setItem('user', stats.first_name);

	return {
		type: 'USER_LOGIN',
		payload: stats,
	};
};

export const logoutUser = stats => {
	console.log(stats);
	localStorage.removeItem('user');

	return {
		type: 'USER_LOGOUT',
		payload: stats,
	};
};

export const userRegister = userStats => {
	return {
		type: 'USER_REGISTER',
		payload: userStats,
	};
};

export const addUser = user => {
	return {
		type: ADD_USER,
		payload: user,
	};
};
