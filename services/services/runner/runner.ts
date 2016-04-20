import * as webdriverio from 'webdriverio';
import * as _ from 'lodash';

interface Config {
    platform: string;
    version: string;
    tags: string[];
    name: string;
    // Options log: verbose | silent | command | data | result -> default silent
    logLevel?: string;
    logOutput?: string | TextStreamWriter;
    host?: string;
    port?: number;
    path?: string;
    baseUrl?: string;
    coloredLogs?: boolean;
    screenshotPath?: string;
    waitforTimeout?: number;
    waitforInterval?: number;
    desiredCapabilities: WebdriverIO.DesiredCapabilities;
}

interface OptionsConstructor {
    name: string;
    url?: string;
    port?: number;
    path?: string;
    protocol?: string;
    config: Config;
}

export class Runner {
    // RUNNER CLASS
    /////////////////////////
    name: string;
    url: string;
    runner: WebdriverIO.Client<any>;

    constructor(options: OptionsConstructor) {
        this.name = options.name;
        this.url = `${options.protocol}://${options.url}:${options.port}`;
        this.runner = webdriverio.remote(options.config);
    }

    start() {
        return this.runner
        .init()
        .url(this.url)
    }
}
