import * as express from 'express';
import { initialState, StateDef } from '../client/store/props';

var state: StateDef | express.Request = state || initialState;

export function getState(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.json(state);
}

export function setState(req: express.Request, res: express.Response, next: express.NextFunction) {
  state = req.body["state"];
  console.log(req.body)
  res.json({
    state: "state changed"
  });
}