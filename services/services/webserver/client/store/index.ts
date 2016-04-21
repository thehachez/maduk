import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';
import { initialState, StateDef } from './props';
import { createStore, applyMiddleware } from 'redux';

export const store: Redux.Store = createStore(rootReducer, initialState, applyMiddleware(thunk));