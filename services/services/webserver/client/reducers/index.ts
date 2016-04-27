import { StateDef, Stages } from '../store/props';
import { combineReducers } from 'redux';
import { constants } from '../actions';
import { menus } from '../core/config';
import { store } from '../store';
import { E } from '../core/easy';
import * as _ from 'lodash';

function message(state = "", action: { type: string, message: string }): string {
    switch (action.type) {
        case constants.SHOW_MESSAGE:
            alert(action.message)
            return action.message;
        default:
            return state;
    }
}

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

function stageSelected(state = "default", action) {
    switch (action.type) {
        case constants.SELECT_STAGE:
            return action.key;
        case constants.CREATE_STAGE:
            return action.stage.keyid;
        default:
            return state;
    }
}

function selectorsStack(state = [], action) {
    let selectors = Array.from(state);
    let redo;
    let getSelector;

    switch (action.type) {
        case constants.ADD_SELECTOR:

            const selector = action.payload.selector;
            const unique = action.payload.uniqueSelector;

            selector.uselector = unique;
            selector.state = "pending";
            selector.editable = false;

            selectors.push(selector);
            return selectors;

        case constants.CONFIRM_SELECTOR:

            getSelector = selectors[_.findIndex(selectors, (n) => n.keyid === action.key)];
            getSelector.state = "confirmed";
            getSelector.uniqueName = getSelector.uniqueName || getSelector.value || getSelector.id || getSelector.tagName;
            return selectors;

        case constants.DELETE_SELECTOR:

            redo = _.remove(selectors, (n) => n.keyid === action.key);
            return selectors;

        case constants.EDIT_SELECTOR:

            getSelector = selectors[_.findIndex(selectors, (n) => n.keyid === action.key)];
            getSelector.editable = true;
            return selectors;

        case constants.CONFIRM_EDIT_SELECTOR:

            getSelector = selectors[_.findIndex(selectors, (n) => n.keyid === action.key)];
            getSelector.editable = false;
            getSelector.uniqueName = action.value;
            return selectors;

        default:
            return state;
    }
}

function stages(state = [], action) {

    let stages = Array.from(state);
    let stage: Stages;
    let getStage: Stages;
    let selector;

    switch (action.type) {
        case constants.CREATE_STAGE:
            stage = action.stage;

            stage.name = "stage " + (E.state.stages.length + 1);
            stage.editable = false;
            stage.items = 0;
            stage.stateExRe = true;

            stages.push(action.stage);

            return stages;
            
        case constants.ADD_SELECTOR:

            selector = action.payload.selector;
            getStage = stages[_.findIndex(stages, (n) => n.keyid === selector.stagekey)];
            getStage.items += 1;

            return stages;
            
        case constants.DELETE_SELECTOR:

            getStage = stages[_.findIndex(stages, (n) => n.keyid === action.stageKey)];
            getStage.items -= 1;

            return stages;

        case constants.EXPAND_STAGE:

            getStage = stages[_.findIndex(stages, (n) => n.keyid === action.stageKey)];
            getStage.stateExRe = true;

            return stages;

        case constants.REDUCE_STAGE:

            getStage = stages[_.findIndex(stages, (n) => n.keyid === action.stageKey)];
            getStage.stateExRe = false;
            
            return stages;
            
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    stages,
    message,
    mangeMenu,
    selectorMenu,
    selectorProps,
    stageSelected,
    selectorsStack
});

