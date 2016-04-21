import * as React from 'react';
import { App } from './containers/main';
import { store } from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ParseDOM } from './core/parser';
import * as $ from 'jquery';

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
