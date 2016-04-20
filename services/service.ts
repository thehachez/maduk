import { Runner } from './services/runner/runner';
import { Proxy } from './services/proxy/proxy';
import { webServer } from './services/webserver/app';
import * as injectors from './services/injectors';

const runnerConfig = {
    // app config
    name: "default",
    protocol: "http",
    url: "localhost",
    port: 8888,
    // webdriver config
    config: {
        // logLevel: "command",
        version: '11',
        platform: 'WINDOWS',
        tags: ['tag1', 'tag2'],
        name: 'default',
        desiredCapabilities: {
            browserName: "chrome"
        }
    }
}

const proxyConfig = {
    url: "http://localhost/ste",
    port: 80,
    proxyPort: 8888,
}

const webServerConfig = {
    port: 5232
}

// WEBSERVER -> PROXY -> RUNNER
const proxy = new Proxy(proxyConfig);
const runner = new Runner(runnerConfig);
const webserver = new webServer(webServerConfig);

// start runner
const client = runner.start();
// set server listen
webserver.onListen = (inf) => {
    console.log("WEBSERVER LISTEN ON PORT:" + inf);
}

proxy.onwrite = () => {
    client.then(() => {
        client.getTitle().then((title) => {
            console.log(title)
        })
    })
        .timeoutsAsyncScript(5000)
        .executeAsync(injectors.root).then((res: any) => {
            console.log("content load status: ", res.value.message);
        });
}
