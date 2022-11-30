export const registerReducer = (state, action) => {
	const {
		type,
		payload: { isRegistered, isVerified}
	} = action

	switch (type) {
		case 'SET_REGISTER':
			return {
				...state,
				isRegistered,
				isVerified,
			}

		default:
			return state
	}
}