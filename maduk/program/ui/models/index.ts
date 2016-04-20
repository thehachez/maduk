// MODELS DEFINITIONS

export interface BrowsersDef {
    // [key: string]: boolean    
    chrome: boolean,
    edge: boolean,
    opera: boolean,
    firefox: boolean,
    ie: boolean,
    safari: boolean
};

export interface Constructor {
    id: number,
    name: string,
    target: string,
    protocol: string,
    aplication: string,
    version: string,
    architecture: string,
    dom: string,
    testType: string,
    aplicationType: string,
    browsers: {
        chrome: boolean,
        edge: boolean,
        opera: boolean,
        firefox: boolean,
        ie: boolean
    }
}
