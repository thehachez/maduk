import thunk from 'redux-thunk';
import * as $ from 'jquery';
import { API } from '../core/config';
import { rootReducer } from '../reducers';
import { MadukClient } from '../core/core';
import { initialState, StateDef } from './props';
import { createStore, applyMiddleware } from 'redux';

var psState: StateDef,
    newStore: Redux.Store;

function getState() {
    // GET PERSISTENT SERVER STATE 

    const url = API.URL + API.SET_STATE_PATH;
    return new Promise((resolve, reject) => {
        $.ajax({
            url: API.URL + API.GET_STATE_PATH,
            type: "GET",
            crossDomain: true,
            success: function (response) {
                MadukClient.log(response, "state get ready: " + url,
                    "request");

                resolve(response);
            },
            error: function (xhr, status) {
                // USE STATE NO SERVER PERSISTENT 
                MadukClient.log(status, "request fail: " + url + "could not load the persistent state",
                    "request");

                reject(initialState);
            }
        });
    });
}


function setState(data) {
    // SET PERSISTENT SERVER STATE 

    const url = API.URL + API.SET_STATE_PATH;
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            crossDomain: true,
            success: function (response) {
                MadukClient.log(response, "state set ready: " + url,
                    "request");

                resolve();
            },
            error: function (xhr, status) {
                MadukClient.log(status, "request fail: " + url + "could not set the persistent state",
                    "request");

                reject();
            }
        });
    });
}

var promiseStore;
getState()
    .then((initServerState) => {
        
        promiseStore = new Promise((resolve, reject) => {
            let storeDispatch: Redux.Dispatch;
            // CREATE THE STORE
            newStore = createStore(rootReducer, initServerState, applyMiddleware(thunk));
            
            storeDispatch = newStore.dispatch;
            // SPY ALL REDUX CHANGES
            newStore.dispatch = (action) => {
                // set the new state
                setState(newStore.getState());

                return storeDispatch(action);
            }

        });
    });

export const store: Promise<Redux.Store> = promiseStore;