
export function boot(params: {

    host: string,
    port?: number,
    path?: string,
    protocol: string,
    scriptName: string,
    linkName: string

}, callback) {
    if (document.getElementById("script_bolt_unique") || document.getElementById("link_bolt_unique")) return;

    var url = (params.protocol + "://" + params.host + ":") + (params.port ? params.port + "/" : "/"),
        scriptName = params.scriptName,
        linkName = params.linkName;

    var dataTotal = 2,
        dataLoad: Array<{}> = [];

    function returner(
        type: string,
        obj?: {
            message: string,
            url: string
        }) {

        // @ return callback array[Objects: { type: string, url: string} ];
        switch (type) {
            case "resource":
                dataLoad.push(obj);
                if (dataLoad.length === dataTotal) callback(dataLoad);
                break;
        }
    }

    var getHeadTag = document.getElementsByTagName('head')[0];
    var getBodyTag = document.getElementsByTagName('body')[0]
        || document.getElementsByTagName('frameset')[0];

    var newLinkTag = document.createElement('link');
    var newScriptTag = document.createElement('script');


    /// SCRIPTS
    newScriptTag.type = 'text/javascript';
    newScriptTag.id = 'script_bolt_unique';
    newScriptTag.src = url + scriptName;

    getBodyTag.appendChild(newScriptTag);
    newScriptTag.addEventListener("load", function (event) {
        returner("resource", {
            message: "script loaded",
            url: url + scriptName
        });
    });

    newScriptTag.addEventListener("error", function (err) {
        returner("resource", {
            message: "script load error",
            url: url + scriptName
        });
    });


    /// LINKS
    newLinkTag.type = 'text/css';
    newScriptTag.id = 'link_bolt_unique';
    newLinkTag.href = url + linkName;

    newLinkTag.rel = "stylesheet";
    getHeadTag.appendChild(newLinkTag);

    newLinkTag.addEventListener("load", function (event) {
        returner("resource", {
            message: "link loaded",
            url: url + linkName
        });
    });

    newLinkTag.addEventListener("error", function (err) {
        returner("resource", {
            message: "link load error",
            url: url + linkName
        });
    });
}