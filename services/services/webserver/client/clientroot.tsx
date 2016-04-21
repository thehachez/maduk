import * as q from 'jquery';
import * as React from 'react';
import { App } from './containers/main';
import { store } from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ParseDOM } from './core/parser';

// window.location.pathname = "ste";
const parser = new ParseDOM({
    appType: "legacy"
});
const elementId = "__root_maduk_";
const mainContainer = q('<div/>', {
    id: elementId,
});

q(window).on('beforeunload', ()=> {
   q.get("http://localhost:5232/clientevents/beforeunload");
});

q((eve) => {
    
    q("html").append(mainContainer);
    q.get("http://localhost:5232/clientevents/load");
    
    render(
        <Provider store={ store }>
            <App />
        </Provider>, document.getElementById(elementId));
});
