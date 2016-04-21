import * as express from 'express';

export function load(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.json({
        event: "load"
    });
}

export function beforeUnload(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.json({
        event: "beforeunload"
    });
}



