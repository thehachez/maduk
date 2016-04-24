import * as _ from 'lodash';

interface Config {
    port: number;
    target: string;
    protocol: string;
    scriptName: string;
    linkName: string;
}

export class MiddleWare {
    selector(config: Config) {
        
        const { port, target, protocol, scriptName, linkName } = config;
        
        var selects = [];
        var selectBody: any = {};
        var selectHead: any = {};

        selectHead.query = 'head';
        selectHead.func = (node)=> {

            var out = `<link type="text/css" rel="stylesheet" href="${protocol}://${target}:${port}/${linkName}">`;

            var rs = node.createReadStream();
            var ws = node.createWriteStream({ outer: false });

            // Read the node and put it back into our write stream, 
            // but don't end the write stream when the readStream is closed.
            rs.pipe(ws, { end: false });

            // When the read stream has ended, attach our style to the end
            rs.on('end', function () {
                ws.end(out);
            });
        }
        
        selectBody.query = 'body';
        selectBody.func = (node)=> {

            var out = `<script type="text/javascript" src="${protocol}://${target}:${port}/${scriptName}"></script>`;

            var rs = node.createReadStream();
            var ws = node.createWriteStream({ outer: false });

            // Read the node and put it back into our write stream, 
            // but don't end the write stream when the readStream is closed.
            rs.pipe(ws, { end: false });

            // When the read stream has ended, attach our style to the end
            rs.on('end', function () {
                ws.end(out);
            });
        }

        selects.push(selectHead, selectBody);

        return selects;
    }
}
