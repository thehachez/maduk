import { routerReducer as routing } from 'react-router-redux';
import { constants } from '../actions/actionsConstructors';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { initialState } from '../store/props';
import { Constructor, BrowsersDef } from '../models';
import { store } from '../store/store';
import * as R from 'ramda';

// fast method -> get store state
function getState(value: string) {
    return store.getState()[value];
};

function constructorFloatState(state = false, action): boolean {
    // MANAGE THE FLOAT LAYER STATE

    switch (action.type) {
        case constants.CONSTRUCTOR_FLOAT_OPEN:
            return true;
        case constants.CONSTRUCTOR_FLOAT_CLOSE:
            return false;
        default:
            return state;
    }
}

function constructors(state = [], action): Array<Constructor> {
    // CREATE A NEW TEST CONTROLER

    let newConstructorcopy = Array.from(state);

    switch (action.type) {
        case constants.CREATE_NEW_CONSTRUCTOR:

            newConstructorcopy.push(R.merge(action.elements, {

                browsers: R.clone(getState("browsersSelect"))

            }));

            return newConstructorcopy;
        default:
            return state;
    }
}

function browsersSelect(
    state: BrowsersDef = Object.freeze(initialState.browsersSelect),
    action: {
        type: string,
        payload: {
            id?: string,
            value?: string,
            browser?: string
        }
    }): BrowsersDef {
    // MANAGE THE BROWSERS ICONS 

    let browsersSelectCopy: BrowsersDef;

    switch (action.type) {

        case constants.SET_BROWSERS_FOR_TESTS:
            /* 
             * CHANGE THE ASPECT FILTER AND STATE FOR BROWSERS ITEMS
            */

            browsersSelectCopy = R.clone(state);
            browsersSelectCopy[action.payload.browser] = !browsersSelectCopy[action.payload.browser];
            return browsersSelectCopy;

        case constants.CONSTRUCTOR_FLOAT_CLOSE:
            /* 
             * WHEN THE CONSTRUCTOR FLOAT IS CLOSED DESTROY THE GHOST CONTRUCTOR
            */

            // return the init model state
            return initialState.browsersSelect;

        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    form,
    constructorFloatState,
    constructors,
    browsersSelect,
    routing
});

