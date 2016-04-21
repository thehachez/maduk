export const servicesConfig = {
    
    api: {
        port: 5232
    },

    proxy: {
        url: "http://localhost/ste",
        port: 80,
        proxyPort: 8888,
    },

    runner: {
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
                browserName: "internet explorer"
                // browserName: "chrome"
           }
        }
    },

    boot: {
        host: "localhost",
        port: 5232,
        protocol: "http",
        scriptName: "clientroot.js",
        linkName: "clientroot.css"

    }
}