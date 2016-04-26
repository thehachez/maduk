import { combineReducers } from 'redux';
import { constants } from '../actions';
import { menus } from '../core/config';
import { StateDef } from '../store/props';
import * as _ from 'lodash';

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

function selectorMenu(state = false, action): boolean {
    switch (action.type) {
        case constants.SHOW_SELECTOR_MENU:
            return true;
        case constants.HIDDE_SELECTOR_MENU:
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
    let redo;
    let selector;

    switch (action.type) {
        case constants.ADD_SELECTOR:

            selectors.push(action.payload.selectorProps);
            return selectors;

        case constants.CONFIRM_SELECTOR:

            selector = selectors[_.findIndex(selectors, (n) => n.keyid === action.key)];
            selector.state = "confirmed";
            return selectors;

        case constants.DELETE_SELECTOR:

            redo = _.remove(selectors, (n) => n.keyid === action.key);
            return selectors;

        case constants.EDIT_SELECTOR:

            selector = selectors[_.findIndex(selectors, (n) => n.keyid === action.key)];
            selector.editable = true;
            return selectors;

        case constants.CONFIRM_EDIT_SELECTOR:

            selector = selectors[_.findIndex(selectors, (n) => n.keyid === action.key)];
            selector.editable = false;
            selector.uniqueName = action.value;
            return selectors;

        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    mangeMenu,
    selectorMenu,
    selectorProps,
    selectorsStack
});

