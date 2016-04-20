import { BrowsersDef, Constructor } from '../models';

export interface stateDef {
    constructorFloatState: boolean;
    constructors: Array<Constructor>;
    browsersSelect: BrowsersDef;
}

// set initial state 
export const initialState: stateDef = {
    constructorFloatState: false,
    constructors: [],
    browsersSelect: {
        chrome: false,
        edge: false,
        opera: false,
        firefox: false,
        ie: false,
        safari: false
    }
};
