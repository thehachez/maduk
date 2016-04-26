import * as events from 'events';
import { Runner } from './runner/runner';
import { api, proxy } from './services';
import { _runner } from './_config';

// create a new runner instance 
export const runner = new Runner(_runner);
const client = runner.start();

/// PROXY EVENTS
//////

// proxy.onrequest = function () {
//     // START THE DRIVER CONTROLLER
//     client.then(() => {
//         client
//             .timeoutsAsyncScript(9000)
//             .executeAsync(scripts.boot, servicesConfig.boot)
//             .then((res: any) => {

//                 const response = res.value;
//                 response.map((value: {
//                     message: string,
//                     url: string
//                 }, key) => {

//                     console.log(value.message.toUpperCase() + " " + value.url);
//                 });
//             });
//     });
// }

/// API EVENTS
//////

api.onListen = (inf) => {
    console.log("WEBSERVER LISTEN ON PORT:" + inf);
}

api.ondriver("load", (request: Express.Request) => {
    console.log("load");
});

api.ondriver("beforeunload", (request: Express.Request) => {
    console.log("beforeuload");
});

/// GET REDY!
//////

proxy.start();
api.start();