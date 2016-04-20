import * as React from 'react';
import { routes } from './routes';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router,
    Route,
    IndexRoute,
    IndexRedirect,
    hashHistory } from 'react-router';

// VIEWS ROUTES
import { App } from './containers/app';
import { Main } from './containers/main';
import { Constructors } from './containers/constructors';

const history = syncHistoryWithStore(hashHistory, store);
render((
    <Provider store={ store }>
        <Router history={ history } routes={ routes }>
        </Router>
    </Provider>),
    document.getElementById("root")
);