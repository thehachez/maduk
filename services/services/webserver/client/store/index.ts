import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';
import { initialState, StateDef } from './props';
import { createStore, applyMiddleware } from 'redux';
import { API } from '../core/config';
import { MadukClient } from '../core/core';
import * as $ from 'jquery';

var psState: StateDef;

function getState() {
    const url = API.URL + API.SET_STATE_PATH;
    
    return $.ajax({
        url: API.URL + API.GET_STATE_PATH,
        type: "GET",
        crossDomain: true,
        success: function (response) {
            // STATE 
            psState = response;
        },
        error: function (xhr, status) {
            MadukClient.log(status, "request fail: " + url + "could not load the persistent state",
                "request");
            psState = initialState;
        }
    });
}
function setState(data) {
    const url = API.URL + API.SET_STATE_PATH;

    $.ajax({
        url: url,
        type: "POST",
        data: data,
        crossDomain: true,
        success: function (response) {
            // STATE 
            psState = response;
        },
        error: function (xhr, status) {
            MadukClient.log(status, "request fail: " + url + "could not load the persistent state",
                "request");
            psState = initialState;
        }
    });
}


var newStore = createStore(rootReducer, psState, applyMiddleware(thunk));

var storeDispatch: Redux.Dispatch = newStore.dispatch;
newStore.dispatch = function (action) {
    let state = store.getState();
    return storeDispatch(action);
}

export const store = newStore;