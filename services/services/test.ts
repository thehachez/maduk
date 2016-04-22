import * as jsdom from 'jsdom';
import * as fs from 'fs';
import * as _ from 'lodash';

interface WindowExtend extends Window {
    $: JQuery;
    l: _.PH; 
}

console.log("START TEST IN VDOM");

var clientroot = fs.readFileSync("./services/webserver/client/statics/clientroot.js", "utf-8");

jsdom.env({
    url: "http://localhost/ste",
    scripts: ["http://code.jquery.com/jquery.js"],
    src: [clientroot],
    done: function (err, window: WindowExtend) {
        var $ = window.$;
        
        console.log("HTML TITLE:" + window.document.title);


        function spyMethod(target, method) {
            var oldMethod = target[method];
            target[method] = function () {
                console.log(arguments);
                return oldMethod.apply(this, arguments);
            }
        }

        spyMethod(window.console, "log");
        spyMethod(window.console, "error");
        spyMethod(window.console, "warn");

        window.addEventListener("error", function (event: any) {
            console.error("script error", event.error);
        });

        window.location.reload();

    }
})