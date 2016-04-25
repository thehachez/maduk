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

function selectorProps(state = {}, action) {
    switch (action.type) {
        case constants.SHOW_SELECTORS_INFO:
            return action.payload.hoverSelectorProps;
        default:
            return state;
    }
}

function selectorsStack(state = [], action) {
    let selectors = Array.from(state);

    switch (action.type) {
        case constants.ADD_SELECTOR:
            selectors.push(action.payload.selectorProps);                        
            return selectors;
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    mangeMenu,
    selectorProps,
    selectorsStack
});

