import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './containers/main';
import * as $ from 'jquery';
import { ParseDOM } from './core/parser';

// ROOT THE WEB DRIVER CLIENT
const parser = new ParseDOM({
    appType: "legacy"
});
const elementId = "__root_maduk_";
const mainContainer = $('<div/>', {
    id: elementId,
});

$((eve) => {
    $("body").before(mainContainer);
    render(
        <Provider store={ store }>
            <App />
        </Provider>, document.getElementById(elementId));
});


