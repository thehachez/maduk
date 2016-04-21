export function boot(callback) {
    if (document.getElementById("script_bolt_unique") || document.getElementById("link_bolt_unique")) return;
    var webserver = {
        url: "http://localhost:5232",
        fileName: "clientroot.js"
    }
    // (<any>window)._ = _;
    var dataTotal = 2;
    var dataLoad: Array<{}> = [];
    function returner(obj: { code: number, message: string }) {
        dataLoad.push(obj);
        if (dataLoad.length === dataTotal) callback(dataLoad);
    }

    var getHeadTag = document.getElementsByTagName('head')[0];
    var getBodyTag = document.getElementsByTagName('body')[0]
        || document.getElementsByTagName('frameset')[0];

    var newLinkTag = document.createElement('link');
    var newScriptTag = document.createElement('script');

    newScriptTag.type = 'text/javascript';
    newScriptTag.id = 'script_bolt_unique';
    newScriptTag.src = webserver.url + "/" + webserver.fileName;
    getBodyTag.appendChild(newScriptTag);
    newScriptTag.addEventListener("load", function (event) {
        returner({
            code: 1,
            message: "script loaded"
        });
    })
    newScriptTag.addEventListener("error", function (err) {
        returner({
            code: 0,
            message: "script load error"
        });
    })

    newLinkTag.type = 'text/css';
    newScriptTag.id = 'link_bolt_unique';
    newLinkTag.href = webserver.url + "/" + '__main_mkst.css';
    newLinkTag.rel = "stylesheet";
    getHeadTag.appendChild(newLinkTag);
    newLinkTag.addEventListener("load", function (event) {
        returner({
            code: 1,
            message: "link loaded"
        });
    })
    newLinkTag.addEventListener("error", function (err) {
        returner({
            code: 0,
            message: "link load error"
        });
    })
}