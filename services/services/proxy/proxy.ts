import * as http from 'http';
import * as connect from 'connect';
import { MiddleWare } from './middleware';
import { _proxyMiddleware } from '../_config';
const httpProxy = require('http-proxy');
const harmon = require("harmon");
// se podria implementar connect 
// para dotar de mayores funcionalidadades al proxy 
interface Config {
    protocol: string,
    port: number | string,
    target: string,
    targetPort?: number,
    path?: string,
    timeout?: number,
    proxyTimeout?: number,
    agent?: string,
    headers?: {}
}

export class Proxy extends MiddleWare {
    // PROXY CLASS
    /////////////////////////
    proxy: any;
    app: connect.Server;
    config: Config;
    target: string;

    constructor(config: Config) {
        super();
        // var middleware = this.intercept.bind(this);
        this.config = config;
        const { port, protocol, target, targetPort, path } = config;
        const url = `${protocol}://${target}:${targetPort || "80"}${path || ""}`;

        this.app = connect();
        // PROXY SET
        config.target = url;
        this.proxy = httpProxy.createProxyServer(config);
        this.proxy.on('error', (err)=> {
            return console.log(err);
        });
    }

    start() {
        
        const self: Proxy = this;
        const app = this.app;
        const { port } = this.config;

        app.use(require('harmon')([], this.selector(_proxyMiddleware), true));
        app.use((req, res, next) => {
            // INTERFACE PROXY 
            self.proxy.web(req, res);
        });

        http.createServer(app).listen(port || 5231);
    }
}


