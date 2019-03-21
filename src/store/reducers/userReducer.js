const initialState = {
	currentUser: null,
	isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER_LOGIN':
			return { ...state, currentUser: action.payload, isLoggedIn: true };
		case 'USER_AUTH':
			return { ...state, currentUser: action.payload, isLoggedIn: true };
		case 'USER_LOGOUT':
			return { ...state, currentUser: null, isLoggedIn: false };
		case 'USER_REGISTER':
			return {
				...state,
				users: [...state.users, action.payload],
			};

		default:
			return state;
	}
};

export default userReducer;
