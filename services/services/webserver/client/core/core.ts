
export class MadukClient {
    protected appType: string;

    constructor(config) {

    }

    protected logError(err: Error, msj: string, type?: string) {
        // set here node devolper log
        console.log(err, msj);
    }

    static log(err: Error | string , msj: string, type?: string) {
        // set here node devolper log
        console.log(err, msj);
    }
}
