
export type Selector = {
    keyid: string,
    stagekey: string,
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

export type Stages = {
    keyid: string,
    name: string,
    editable: boolean,
    items: number,
    stateExRe: boolean
}

export interface StateDef {
    message: string;
    mangeMenu: boolean;
    selectorMenu: boolean;
    selectorProps: {};
    stages: Array<Stages>;
    stageSelected: string;
    selectorsStack: Array<Selector>;
}

// set initial state 
export const initialState: StateDef = {
    message: "",
    mangeMenu: false,
    selectorMenu: false,
    selectorProps: {},
    stages: [],
    stageSelected: "default",
    selectorsStack: []
};
