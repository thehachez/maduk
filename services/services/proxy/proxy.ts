import { Middleware } from './middleware';
const foxy = require("foxy");

export class Proxy extends Middleware {
    // PROXY CLASS
    /////////////////////////
    proxy: any;
    constructor(config: {
        proxyPort: number | string,
        port?: number,
        url: string,
        path?: string
    }) {
        super();
        var middleware = this.interceptMiddleware.bind(this);
        
        const set = {
            proxyRes: [
                middleware
            ]
        };

        this.proxy = foxy(config.url, set)
            .listen(config.proxyPort);
    }
}


