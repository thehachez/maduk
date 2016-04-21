import * as _ from 'lodash';

interface Config {
    appType: string;
}

interface ReplaceOptions {
    source: string;
    type: string;
}

interface ManageDataDef {
    replaceInData(options: ReplaceOptions, data: string): string;
    unique: string;
}

class ManageData implements ManageDataDef {

    dataPipe: string;
    appType: string;
    unique: string;

    constructor() {
    }

    set(data): ManageData {
        this.dataPipe = data;
        return this;
    }

    pipe(data): ManageData {
        this.dataPipe = data;
        return this;
    }

    return() {
        return _.replace(this.dataPipe, this.unique, "");
    }

    replaceInData(options: ReplaceOptions): string {
        let queryTemplate: string,
            testCase: string;
        queryTemplate = this.dataPipe;

        let ifScript: string,
            ifLink: string,
            ifCapIn: string,
            ifCapOut: string;

        switch (options.type) {
            case "script":
                testCase = testFormat("body", queryTemplate);
                ifScript = `<script type="text/javascript" src="${options.source}"></script>${testCase}`;

                queryTemplate = _.replace(queryTemplate, testCase, ifScript);
                break;
            case "link":
                testCase = testFormat("head", queryTemplate);
                ifLink = `<link type="text/css" rel="stylesheet" href="${options.source}"/>${testCase}`;

                queryTemplate = _.replace(queryTemplate, testCase, ifLink);
                break;
            case "encapsulate":

                testCase = testFormat("html", queryTemplate);
                ifCapIn = `${testCase}<iframe style="border: 0; width:100%; height:100%; sandbox="" src="${options.source}">`;
                queryTemplate = _.replace(queryTemplate, testCase, ifCapIn);

                testCase = testFormat("/html", queryTemplate);
                ifCapOut = `</iframe">${testCase}`;
                queryTemplate = _.replace(queryTemplate, testCase, ifCapOut);
                break;
        }

        function testFormat(type, data) {
            switch (type) {
                case "html":
                    if (/<html>/g.test(data)) return "<html>";
                    else if (/<HTML>/g.test(data)) return "</HTML>";
                case "/html":
                    if (/<\/html>/g.test(data)) return "</html>";
                    else if (/<\/HTML>/g.test(data)) return "</HTML>";
                case "body":
                    if (/<\/body>/g.test(data)) return "</body>";
                    else if (/<\/BODY>/g.test(data)) return "</BODY>";
                case "head":
                    if (/<\/head>/g.test(data)) return "</head>";
                    else if (/<\/HEAD>/g.test(data)) return "</HEAD>";
            }
        }

        return queryTemplate;
    }
}

export default new ManageData();

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