import { Proxy } from './proxy/proxy';
import { webServer } from './webserver/app';
import { _proxy, _api } from './_config';

export const proxy = new Proxy(_proxy);
export const api = new webServer(_api);





