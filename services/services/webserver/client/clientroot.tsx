import * as $ from 'jquery';
import * as React from 'react';
import { App } from './containers/main';
import { store } from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ParseDOM } from './core/parser';
import * as _ from 'lodash';
// window.location.pathname = "ste";

// EXTEND WINDOW METHODS
var win: any = window;
win._mad = _.noConflict();
// EXTEND WINDOW METHODS

const parser = new ParseDOM({
    appType: "legacy"
});
const elementId = "__root_maduk_";
const mainContainer: any = $('<div/>', {
    id: elementId,
});

$(window).on('beforeunload', () => {
    $.get("http://localhost:5232/clientevents/beforeunload");
});

$((eve) => {
    // prevent doble insetion;
    if ($("#__root_maduk_")[0]) return;
    console.log("MADUK CLIENT");
    
    $("html").append(mainContainer);
    
    $.get("http://localhost:5232/clientevents/load");

    render(
        <Provider store={ store }>
            <App />
        </Provider>, document.getElementById(elementId));
});
