import { Middleware } from './middleware';
const foxy = require("foxy");

interface Config {
    proxyPort: number | string,
    port?: number,
    url: string,
    path?: string
}


export class Proxy extends Middleware {
    // PROXY CLASS
    /////////////////////////
    proxy: any;
    config: Config;

    constructor(config: Config) {
        super();
        this.config = config;
    }

    start() {

        var middleware = this.interceptMiddleware.bind(this);
        const set = {
            proxyRes: [
                middleware
            ]
        };

        this.proxy = foxy(this.config.url, set)
            .listen(this.config.proxyPort);
    }
}


