import datamanagment from './lib/managedata';
import * as _ from 'lodash';

export class Middleware {
    changeMidStack: Array<Function>;
    onwrite: () => void;

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
                    let dataDecoded = data.toString(),
                        appType: string = "legacy";

                    // dataDecoded = datamanagment
                    //     .set(dataDecoded)
                    //     .pipe(datamanagment.replaceInData({
                    //         source: "http://localhost:8888/ste",
                    //         type: "encapsulate"
                    //     }))
                    //     // .pipe(datamanagment.replaceInData({
                    //     //     source: "http://localhost:8287/wsstyle.css",
                    //     //     type: "link"
                    //     // }))
                    //     // .pipe(datamanagment.replaceInData({
                    //     //     source: "http://localhost:8287/clientroot.bundle.js",
                    //     //     type: "script"
                    //     // }))
                    //     .return();

                    _write.call(response, new Buffer(dataDecoded), "utf8", (dat) => {
                        console.log("body writed");
                    });
                }

                // REWRITE RESPONSE END

                this.onwrite();

            } else {

                response.write = _write;
                response.end = _end;

            }

        } catch (err) {

            console.log(err);

        }
    }
}
