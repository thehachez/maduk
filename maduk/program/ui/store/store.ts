import thunk from 'redux-thunk';
import DevTools from '../containers/devTools';
import { rootReducer } from '../reducers';
import { hashHistory } from 'react-router';
import { persistState } from 'redux-devtools';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import * as createLogger from 'redux-logger';
import { initialState } from './props';
const router = routerMiddleware(hashHistory);
// create logger
const logger = createLogger({
    level: 'info',
    collapsed: true,
});

const enhancer = compose(
    applyMiddleware(thunk, router, logger),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&]+)\b/
        ))
)

export const store = createStore(rootReducer, initialState, applyMiddleware(thunk));