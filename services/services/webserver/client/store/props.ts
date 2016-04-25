
export type Selector = {
    tagName: string,
    id: string,
    className: string,
    nodeName: string,
    uselector: string
}

export interface StateDef {
    mangeMenu: boolean;
    selectorProps: {};
    selectorsStack: Array<Selector>;
}

// set initial state 
export const initialState: StateDef = {
    mangeMenu: false,
    selectorProps: {},
    selectorsStack: []
};
