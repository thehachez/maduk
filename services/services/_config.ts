export const _application = {
    appType: "legacy"
}

export const _api = {
    port: 5232
}

export const _proxy = {
    protocol: "http",
    target: "localhost",
    port: 8888,
    timeout: 5000,
    proxyTimeout: 5000,
}

export const _proxyMiddleware = {
    port: 5232,
    target: "localhost",
    protocol: "http",
    scriptName: "clientroot.js",
    linkName: "clientroot.css",
    divRootId: "__root_maduk_"
};

export const _runner = {
    // app config
    name: "default",
    protocol: "http",
    url: "localhost",
    path: "ste",
    port: 8888,
    // webdriver config
    config: {
        logLevel: "dev",
        version: '11',
        platform: 'WINDOWS',
        tags: ['tag1', 'tag2'],
        name: 'default',
        desiredCapabilities: {
           // browserName: "internet explorer"
            browserName: "chrome"
        }
    }
};
