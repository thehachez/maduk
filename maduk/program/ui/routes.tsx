import * as React from 'react';
import { Router,
    Route,
    IndexRoute,
    IndexRedirect } from 'react-router';

// VIEWS ROUTES
import { App } from './containers/app';
import { Main } from './containers/main';
import { Constructors } from './containers/constructors';
import { TestFlow } from './containers/testFlow';

export const routes = (
    <Route path='/' component={ App } >
        <IndexRoute component={ Main }/>
        <Route path="/main" component={ Main }></Route>
        <Route path="/constructors" component={ Constructors }></Route>
        <Route path="/Testflow" component={ TestFlow }></Route>
    </Route>
);
