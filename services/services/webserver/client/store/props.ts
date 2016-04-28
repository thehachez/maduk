
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
    editable: boolean,
    element: HTMLElement
}

export type Stages = {
    keyid: string,
    name: string,
    editable: boolean,
    items: number,
    stateExRe: boolean,
    selected: boolean,
}

export type Message = {
    message: string,
    options: {
        offset: number,
        position: string,
        theme: string,
        time: number,
        transition: string
    }
}

export interface StateDef {
    message: Message;
    mangeMenu: boolean;
    selectorMenu: boolean;
    selectorProps: {};
    stages: Array<Stages>;
    stageSelected: string;
    selectorsStack: Array<Selector>;
}

// set initial state 
export const initialState: StateDef = {
    message: {
        message: "",
        options: {
            offset: 14,
            position: 'top right',
            theme: 'dark',
            time: 5000,
            transition: 'scale'
        }
    },
    mangeMenu: false,
    selectorMenu: false,
    selectorProps: {},
    stages: [],
    stageSelected: "default",
    selectorsStack: []
};
