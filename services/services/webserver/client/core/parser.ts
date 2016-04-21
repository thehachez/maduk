import { MadukClient } from './core';
import * as _ from 'lodash';
import * as q from 'jquery';

// FLUX
import * as fluxActions from '../actions';
import { store } from '../store';

const dispatch = store.dispatch;
const uniquemodule = require("../statics/unique-selector/src/index");
const unique = uniquemodule.default;

/// app type legacy
export class ParseDOM extends MadukClient {

    keyActivated: boolean;
    keysPress: number[];

    defaultKeyMenu: number;
    defaultCaptureSelector: number;

    constructor(config) {
        super(config);
        this.root();

        /// KEY CONFIG
        this.defaultKeyMenu = 88;
        this.defaultCaptureSelector = 75;
    }

    private root() {
        /// this method start the DOM parser
        this.setGlobalsEvents(window);

        // if (window.frames.length) {
        //     try {

        //         for (let index = 0; index < window.frames.length; index++) {
        //             this.bindEvents(window.frames[index].document);
        //         }

        //     } catch (err) {

        //         this.logError(err, "there was a problem in the maduk dom parser: in root");
        //     }

        // } else {

        //     this.bindEvents(document);
        // }
    }

    private seachInframes(frames, queryCssPath): Element {
        /// seach the selector in all DOM frames
        try {

            for (let index = 0; index < window.frames.length; index++) {
                if (!frames[index].document.querySelector(queryCssPath)) continue;
                else return frames[index].document.querySelector(queryCssPath);
            }

        } catch (err) {

            this.logError(err, "there was a problem in the maduk dom parser: search in frames");
        }
    }

    private seachInBody(queryCssPath): Element {
        /// seach the selector in DOM body
        try {

            if (!document.querySelector(queryCssPath)) return;
            else return document.querySelector(queryCssPath);

        } catch (err) {

            this.logError(err, "there was a problem in the maduk dom parser: search in body");
        }
    }

    private setGlobalsEvents(element: Window) {
        /// detect key pressed for call actions
        q(element).keydown((event: KeyboardEvent) => {
            const key: number = event.keyCode || event.which;

            // set action keys for get element unique selector
            if (event.ctrlKey
                && event.shiftKey
                && key === this.defaultCaptureSelector) {
                !this.keyActivated;
            }

            // set actions keys for open the client menu
            if (event.ctrlKey
                && event.shiftKey
                && key === this.defaultKeyMenu) {
                // REDUX DISPATCH ACTION
                dispatch(fluxActions.manageMainMenu());
            }

        });
    }

    private bindEvents(element) {
        /// create expecial iterator of iterate all nodes in the DOM
        try {

            let currentNode,
                ni = document.createNodeIterator(element, NodeFilter.SHOW_ALL);

            /* Optional Options for the unique selector  */
            const options = {
                // Array of selector types based on which the unique selector will be generate
                // selectorTypes: [ 'ID', 'Class', 'Tag', 'NthChild' ]
            }

            while (currentNode = ni.nextNode()) {
                q(currentNode).click((eve) => {
                    if (this.keyActivated) return false;

                    if (this.appType === "legacy") {
                        this.seachInframes(window.frames, unique(eve.target, options));
                    } else {
                        this.seachInBody(unique(eve.target, options));
                    }

                });
            }

        } catch (err) {

            this.logError(err, "there was a problem in the maduk dom parser: binding events");
        }
    }
}


