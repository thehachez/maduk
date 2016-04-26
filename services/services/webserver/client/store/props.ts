
export type Selector = {
    keyid: string | number,
    state: string,
    tagName: string,
    id: string,
    className: string,
    nodeName: string,
    uselector: string,
    value: string,
    uniqueName: any,
    editable: boolean
}

export interface StateDef {
    mangeMenu: boolean;
    selectorMenu: boolean;
    selectorProps: {};
    selectorsStack: Array<Selector>;
}

// set initial state 
export const initialState: StateDef = {
    mangeMenu: false,
    selectorMenu: false,
    selectorProps: {},
    selectorsStack: []
};
