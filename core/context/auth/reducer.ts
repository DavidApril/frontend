import { ACTIONS, InitialState } from './interfaces';

export const authReducer = (authState: InitialState, action: ACTIONS) => {
	switch (action.type) {
		case 'SIGN_IN':
			return {
				...authState,
				user: action.payload.user,
				token: action.payload.token,
				isAuthenticated: true,
			};

		case 'SET_IS_AUTHENTICATED': {
			return {
				...authState,
				isAuthenticated: action.payload,
			};
		}

		default:
			return authState;
	}
};
