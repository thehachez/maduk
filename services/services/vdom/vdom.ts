import * as jsdom from 'jsdom';
import * as scripts from '../runner/scripts/boot';
import * as fs from 'fs';

//var jquery = fs.readFileSync("./path/to/jquery.js", "utf-8");
const scriptBootConfig = {
    host: "localhost",
    port: 5232,
    scriptName: "clientroot.js",
    linkName: "clientroot.css"
}

jsdom.env({
    url: "http://localhost/ste",
    done: function (err, window) {
        console.log(window)
    }
});
