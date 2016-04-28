import { MadukClient } from './core';
import * as _ from 'lodash';
import * as q from 'jquery';

// FLUX
import * as fluxActions from '../actions';
import { store } from '../store';
import { StateDef } from '../store/props';

const dispatch = store.dispatch;
const state = {
    get g(): StateDef {
        return store.getState();
    }
};
const uniquemodule = require("../statics/unique-selector/src/index");
const unique = uniquemodule.default;

/// app type legacy
export class ParseDOM extends MadukClient {

    appType: string;
    keyActivated: boolean;
    keysPress: number[];

    defaultKeyMenu: number;
    defaultCaptureSelector: number;
    frames: Document[];
    framesExist: boolean | number;
    uniqueOp: {
        selectorTypes: ['ID', 'Class', 'Tag', 'NthChild']
    }
    banElementTypes: string[];

    constructor(config) {
        super(config);

        /// KEY CONFIG
        this.defaultKeyMenu = 88; // key -> k
        this.defaultCaptureSelector = 75; // key -> x 
        this.appType = "legacy";
        this.frames = [];
        this.keyActivated = false;
        this.framesExist = this.ifExistFrames();
        this.banElementTypes = ["html", "body", "head", "frameset", "frame", "script", "link", "meta"];
        this.root();
    }

    private root() {
        var self = this;

        // se mapean los frames actuales incluyendo si existe el body
        // en mapframes se bidean un evento de carga en caso en caso de que cambien los datos
        // de los frames
        // deberia tener un iterador en caso de que ayan mas frames con el mismo nombre
        // actualmente esta harcodeado para frames de nombre unico

        if (this.framesExist) {

            this.mapFrames(window.frames, (frame: {
                win: Window,
                doc: Document,
                name: string
            }) => {

                let frameNode: any;
                const {  win, doc, name } = frame;
                this.set(win, doc);

                if (q(`[name="${name}"]`)[0]) {
                    frameNode = q(`[name="${name}"]`)[0];
                    frameNode.onload = function () {
                        self.set(win, doc);
                    };
                }
            });

        } else {

            this.set(window, document);
        }
    }

    private set(win, doc) {
        this.setEventsPerElement(win, doc);
        this.setGlobalsEvents(win, doc);
    }

    private getFrame(name: string) {
        if (window.frames[name]) {
            return {
                win: window.frames[name].window,
                doc: window.frames[name].document
            };
        }
    }

    private spyMethod(target, method, handler: Function) {
        // metodo para observar cambios en el metodo del target que seria un objeto
        // si este cambia llama a una funcion handler
        const realMethod = target[method];
        target[method] = function () {
            if (_.isFunction(handler)) handler(arguments);
            return realMethod.apply(this, arguments);
        }
    }

    private mapFrames(winFrames, frameBack: (frame: {
        win: Window,
        doc: Document,
        name?: string
    }) => void): Document[] | boolean {

        // metodo para mapear los window object y document object de los frames.
        // tener en cuenta que el el dom tamb puede tener body
        let body = q("body");

        try {

            for (let index = 0; index < winFrames.length; index++) {
                this.frames.push(winFrames[index]);
                frameBack({
                    name: winFrames[index].window.name,
                    win: winFrames[index].window,
                    doc: winFrames[index].document
                });
            }

            if (body) frameBack({
                win: window,
                doc: document
            });

        } catch (err) {

            this.logError(err, "there was a problem in the maduk dom parser: reduce frames");
            return false;
        }

        return this.frames;
    }

    private ifExistFrames() {
        return window.frames.length ? window.frames.length : false;
    }

    private ifAppIs(type: string) {
        return this.appType === type ? true : false;
    }


    private setIndividualEvents(element: JQuery, scope: Document, type: string) {
        // al posar el mouse sobre los elementos se obtienen las props de los mismos

        element.on("mouseover", (eve) => {
            //dispatch(fluxActions.showSelectorsInfo(eve));
            return false;
        });

        switch (type) {
            case "select":

                element.on("click", (eve) => {
                    eve.preventDefault();

                    if (this.keyActivated) {
                        element.attr("disabled", "disabled");
                        setTimeout(() => element.removeAttr("disabled"), 1000);
                        dispatch(fluxActions.addSelector(eve, state.g.stageSelected, unique(eve.target)));

                        return false;
                    }
                });

                break;
            default:

                element.on("click", (eve) => {
                    eve.preventDefault();

                    if (this.keyActivated) {

                        dispatch(fluxActions.addSelector(eve, state.g.stageSelected, unique(eve.target)));

                        return false;
                    }
                });

                break;
        }
    }


    private setGlobalsEvents(win: Window, doc: Document, elements?: HTMLElement) {
        // metodo para setear los eventos globales en window y document y en elementos particulares.

        //win.focus();

        q(win).on("keyup", (event) => {
            const key: number = event.keyCode || event.which;

            event.preventDefault();
            event.stopPropagation();

            this.keyActivated = false;

            return false;

        });


        q(win).on("keydown", (event) => {
            const key: number = event.keyCode || event.which;

            event.preventDefault();
            event.stopPropagation();

            if (event.ctrlKey
                && event.shiftKey) {
                this.keyActivated = true;
            }

            if (event.ctrlKey
                && event.shiftKey
                && key === this.defaultKeyMenu) {
                // REDUX DISPATCH ACTION

                if (!state.g.mangeMenu)
                    dispatch(fluxActions.showTopMenu());
                else
                    dispatch(fluxActions.hiddeTopMenu());
            }

        });

        return false;
    }

    private getUniqueSelector(doc: Document, queryCssPath): Element {
        try {

            if (!doc.querySelector(queryCssPath)) return;
            else return doc.querySelector(queryCssPath);

        } catch (err) {

            this.logError(err, "there was a problem in the maduk dom parser: get unique seletor");
        }
    }

    private setEventsPerElement(win: Window, doc: Document, elements?: HTMLElement) {
        // metodo para iterar sobre todos los elementos del DOM
        // previene los elementos baneados para evitar los bindings en nodos como el body y html
        var currentNode;
        var ni;
        try {

            ni = doc.createNodeIterator(doc, NodeFilter.SHOW_ALL, null, false);

            while (currentNode = ni.nextNode()) {
                let node = q(currentNode);
                let tagName;

                if (currentNode.tagName) {
                    tagName = currentNode.tagName.toLowerCase();
                    if (!_.find(this.banElementTypes,
                        ban => ban === tagName)) {

                        this.setIndividualEvents(node, doc, tagName);
                    }
                }
            }

        } catch (err) {

            this.logError(err, "there was a problem in the maduk dom parser: error on create node iterator");
        }
    }
}


