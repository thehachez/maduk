import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as errorhandler from 'errorhandler';
import * as notifier from 'node-notifier';
import * as debugModule from 'debug';
import * as _ from 'lodash';
import * as routesViews from './routes';
// controllers
import * as routesFlux from './controllers/flux';
import * as routesEvents from './controllers/clientevents';
// config files
import * as clConfig from './client/core/config';
import * as wsConfigs from './configs/server';

const cors = require("cors");

export class webServer {

  public app: express.Application;
  public port: number;
  public server: http.Server;
  public onListen: (inf: number) => void;
  public onError: (err) => void;
  public onDriverEvent: (event: string, request: express.Request) => void;
  public logLevel: string;

  // EVENTS FUNCTIONS STACKS
  public onClientload: Function[];
  public onClientbeforeunload: Function[];

  constructor(config: {
    port: number
  }) {
    // create expressjs application
    this.app = express();
    // configure port
    this.port = config.port;
    // log morgan level 
    this.logLevel = 'dev';
    // configure application
    this.config();
    // configure routes
    this.routes();
    // erros handlers
    this.catchErrors();


    // set listeners stack
    this.onClientload = [];
    this.onClientbeforeunload = [];
  }

  /// CONFIG EXPRESS
  /////////

  private config() {

    const app = this.app;
    const port = this.normalizePort(process.env.PORT || this.port);

    // set server port
    app.set('port', port);
    // view engine setup
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'jade');
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger(this.logLevel));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(cookieParser());
    app.use(cors());
    app.use(express.static(path.resolve(__dirname + '/client/statics')));
    if (process.env.NODE_ENV === 'development') {
      // only use in development
      app.use(errorhandler({
        log: (err, str, req) => this.errorNotification(err, str, req)
      }));
    }
  }

  /// ROUTES
  /////////

  private routes() {
    // get router
    let router: express.Router;
    router = express.Router();

    // home page
    router.get("/", routesViews.index);

    // set state of store flux
    router.use(clConfig.API.SET_STATE_PATH, routesFlux.setState);

    // get state of store flux
    router.use(clConfig.API.GET_STATE_PATH, routesFlux.getState);

    // get client send load event
    router.use(wsConfigs.API.GET_CLIENT_LOAD, (req: express.Request, res: express.Response, next: express.NextFunction) => {

      if (_.isFunction(this.onDriverEvent)) {

        this.onDriverEvent("load", req);
        this.onEventInvoker("load", req);

      }

      routesEvents.load(req, res, next);
    });

    // get client send beforeunload event
    router.use(wsConfigs.API.GET_CLIENT_BEFOREUNLOAD, (req: express.Request, res: express.Response, next: express.NextFunction) => {

      if (_.isFunction(this.onDriverEvent)) {

        this.onDriverEvent("beforeunload", req);
        this.onEventInvoker("beforeunload", req);

      }

      routesEvents.beforeUnload(req, res, next);
    });


    //use router middleware
    this.app.use(router);
  }

  // EVENTS HANDLERS
  public ondriver(type: string, listener: Function) {
    switch (type) {
      case "load":

        if (_.isFunction(listener)) this.onClientload.push(listener);
        break;
      case "beforeunload":

        if (_.isFunction(listener)) this.onClientbeforeunload.push(listener);
        break;
    }
  }

  public onEventInvoker(type: string, req: Express.Request) {

    function executor(stack) {
      _.each(stack, (lisentener) => {
        if (_.isFunction(lisentener)) lisentener(req);
      });
    }

    switch (type) {
      case "load":

        executor(this.onClientload);
        break;
      case "beforeunload":

        executor(this.onClientbeforeunload);
        break;
    }
  }

  /// ERRORS HANDLERS 
  /////////

  private catchErrors() {
    const app = this.app;

    //catch 404 and forward to error handler
    app.use((req, res, next) => {
      var err = new Error('Not Found');
      err['status'] = 404;
      next(err);
    });

    // ERRORS HANDLERS
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {

      app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err: any, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  }


  /// BIN 
  /////////

  public start() {
    /**
     * Create HTTP server.
     */
    const app: any = this.app;
    this.server = http.createServer(app);
    // Listen on provided port,on all network interfaces.
    this.server.listen(this.port);
    this.server.on('error', (err) => this.onError(err));
    this.server.on('listening', () => this.onListening());

  }

  private onErrorInt(error) {
    /**
     * Event listener for HTTP server "error" event.
     */
    let bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port;

    if (error.syscall != 'listen') {

      if (_.isFunction(this.onError)) this.onError(error);
      throw error;

    }

    //handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + 'requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + 'is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private onListening() {

    const debug = debugModule('express:server');
    if (_.isFunction(this.onListen)) this.onListen(this.port);
    let addr = this.server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);

  }

  private normalizePort(val: any): number | string | boolean {
    /**
     * Normalize a port into a number,string,or false.
    */
    let port = parseInt(val, 10);

    if (isNaN(port)) {
      //name pipe
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  }


  private errorNotification(err, str, req) {
    let title = 'Error in ' + req.method + ' ' + req.url;
    notifier.notify({
      title: title,
      message: str
    });
  }

}

