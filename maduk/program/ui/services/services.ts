interface RequestConstructor {
    method: string;
    request: string;
    mode?: string;
    headers?: string[] | any;
    cache?: string;
    controller: string;
    values?: any;
    action?: string | {};
}

export class MaServices {
    url: string;
    constructor() {
        this.url = "http://localhost:1337";
    }

    getData(type: string): Promise<Response> {
        if (type === "mgDataArea") {
            return this.fetcher({
                mode: "cors",
                method: "PUT",
                request: "JSON",
                controller: "DataManagement",
                action: "getMgAreas"
            });
        }
        else if (type === "mgDataTask") {
            return this.fetcher({
                mode: "cors",
                method: "PUT",
                request: "JSON",
                controller: "DataManagement",
                action: "getMgTasks"
            });
        }
    }

    fetcher(request: RequestConstructor): Promise<Response> {
        var reqConstructor: any = {},
        promise: Promise<Response>;
        // set defaut request props.
        request.controller = (request.controller !== undefined)
            ? "/" + request.controller
            : "";
        request.action = (request.action !== undefined)
            ? "/" + request.action
            : "";

        // check props for send in request body
        if (request.mode) reqConstructor.mode = request.mode; // default - cors  
        if (request.method) reqConstructor.method = request.method; // VERBS POST GET DELETE PUT...
        if (request.headers) reqConstructor.headers = request.headers;
        if (request.cache) reqConstructor.cache = request.cache; // default disabled
        if (request.values !== undefined && typeof request.values === "object")
            reqConstructor.values = JSON.stringify(request.values); // request body in JSON

        if (request.request === "JSON") {
            // GENERATE JSON PARSE PROMISE.
            promise = new Promise((response, reject) => {
                fetch(this.url + request.controller + request.action, reqConstructor)
                    .then((resp) => {
                        response(resp.json());
                    })
                    .catch((respErr) => {
                        reject(respErr);
                    });
            });

            return promise;
        }

        // GENERATE NORMAL PROMISE.
        return fetch(this.url + request.controller + request.action, reqConstructor);
    }
}

let Services = new MaServices;
export default Services;