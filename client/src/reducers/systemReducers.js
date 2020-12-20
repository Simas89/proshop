import { SYSTEM_MENU_TOGGLE } from '../constants/systemConstants';

export const systemMenuReducer = (state = { isMenuOpen: false }, action) => {
	switch (action.type) {
		case SYSTEM_MENU_TOGGLE:
			return { isMenuOpen: action.payload };

		default:
			return state;
	}
};
