import { combineReducers } from 'redux';
import { constants } from '../actions';
import { menus } from '../core/config';

function mangeMenu(state = false, action): boolean {
    switch (action.type) {
        case constants.SHOW_TOP_MENU:
            return true;
        case constants.HIDDE_TOP_MENU:
            return false;
        default:
            return state;
    }
}

function seletorProps(state = {}, action) {
    switch (action.type) {
        case constants.SHOW_SELECTORS_INFO:
            return action.payload.selectorProps;
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    mangeMenu,
    seletorProps
});

