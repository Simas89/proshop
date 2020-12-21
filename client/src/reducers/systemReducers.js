import { SYSTEM_MENU_TOGGLE, PX_TO_BOTTOM } from '../constants/systemConstants';

export const systemMenuReducer = (
	state = { isMenuOpen: false, pxToBottom: 1000 },
	action
) => {
	switch (action.type) {
		case SYSTEM_MENU_TOGGLE:
			return { ...state, isMenuOpen: action.payload };
		case PX_TO_BOTTOM:
			return { ...state, pxToBottom: action.payload };

		default:
			return state;
	}
};
