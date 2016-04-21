import { Proxy } from './proxy/proxy';
import { webServer } from './webserver/app';
import { servicesConfig } from './_config';

export const proxy = new Proxy(servicesConfig.proxy);
export const api = new webServer(servicesConfig.api);





