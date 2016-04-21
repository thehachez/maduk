import datamanagment from './lib/managedata';
import * as _ from 'lodash';

export class Middleware {
    
    changeMidStack: Array<Function>;
    onrequest: (response) => void;
    onwrite: (data) => void;
    
    constructor() {

    }

    interceptMiddleware(proxyRes, req, config, response) {
        
        var _write = response.write,
            _end = response.end,
            _writeHead = response.writeHead,
            _headers = proxyRes.headers["content-type"],
            _chunks: Buffer[] = [];

        try {
            if (_headers
                && typeof _headers === "string"
                && /text\/html/g.test(_headers)
                && /charset=utf-8/g.test(_headers)) {

                // REWRITE RESPONSE HEADERS 

                response.writeHead = function () {
                    // This disables chunked encoding
                    response.setHeader('transfer-encoding', '');
                    // Disable cache for all http as well
                    response.setHeader('cache-control', 'no-cache');

                    _writeHead.apply(this, arguments);
                };

                // REWRITE RESPONSE
                response.write = function (data) {
                    // let dataDecoded = data.toString();

                    _write.call(response, new Buffer(data), "utf8", (dat) => {
                        // REWRITE RESPONSE END
                        if (_.isFunction(this.onwrite)) this.onwrite(data);

                    });
                }

                // REWRITE RESPONSE END

                if (_.isFunction(this.onrequest)) this.onrequest(response);

            } else {

                response.write = _write;
                response.end = _end;

            }

        } catch (err) {

            console.log(err);

        }
    }
}
