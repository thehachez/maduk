import * as _ from 'lodash';
import * as q from 'jquery';
import { menus } from '../core/config';
const TweenLite = require("gsap");

export interface ActionsDef {
    manageMainMenu(): { type: string }
}

export const constants = {
    SHOW_TOP_MENU: "SHOW_TOP_MENU",
    HIDDE_TOP_MENU: "HIDDE_TOP_MENU",
    SHOW_SELECTOR_MENU: "SHOW_SELECTOR_MENU",
    HIDDE_SELECTOR_MENU: "HIDDE_SELECTOR_MENU",
    SHOW_SELECTORS_INFO: "SHOW_SELECTORS_INFO",
    CREATE_STAGE: "CREATE_STAGE",
    ADD_SELECTOR: "ADD_SELECTOR"
}

export function showTopMenu() {
    // SHOW AND ANIMATE CLIENT MAIN PANEL
    TweenLite.to("#__mad_topper_", menus.animationVelocity,
        {
            width: "25%"
        }
    );

    return {
        type: constants.SHOW_TOP_MENU
    }
}

export function hiddeTopMenu() {
    // SHOW AND ANIMATE CLIENT MAIN PANEL
    TweenLite.to("#__mad_topper_", menus.animationVelocity,
        {
            width: "0%"
        }
    );

    return {
        type: constants.HIDDE_TOP_MENU
    }
}

export function showSelectorMenu() {
    // 8 0 85 7
    TweenLite.to("#__me_select_add", menus.animationVelocityMs,
        {
            height: "15%"
        }
    );

    TweenLite.to("#__me_select_mid", menus.animationVelocityMs,
        {
            height: "70%"
        }
    );

    return {
        type: constants.SHOW_SELECTOR_MENU
    }
}

export function hiddeSelectorMenu() {
    // 8 15 70 7
    TweenLite.to("#__me_select_add", menus.animationVelocityMs,
        {
            height: "0%"
        }
    );

    TweenLite.to("#__me_select_mid", menus.animationVelocityMs,
        {
            height: "85%"
        }
    );

    return {
        type: constants.HIDDE_SELECTOR_MENU
    }
}


export function createStage() {
    return {
        type: constants.CREATE_STAGE
    }
}


export function showSelectorsInfo(eve: JQueryEventObject) {
    const hoverSelectorProps: any = {};

    if (eve.target.tagName) {
        hoverSelectorProps.tagName = eve.target.tagName;
    }
    if (eve.target.id) {
        hoverSelectorProps.id = eve.target.id;
    }
    if (eve.target.className) {
        hoverSelectorProps.tagName = eve.target.className;
    }
    if (eve.target.nodeName) {
        hoverSelectorProps.nodeName = eve.target.nodeName;
    }
    //constants.SHOW_SELECTORS_INFO
    return {
        type: "SHOW_SELECTORS_INFO",
        payload: {
            hoverSelectorProps
        }
    }
}

export function addSelector(eve: JQueryEventObject, uniqueSelector) {
    const selectorProps: any = {};
    const target: any = eve.target;

    selectorProps.uselector = uniqueSelector;
    selectorProps.state = "pending";

    if (target.tagName) {
        selectorProps.tagName = target.tagName;
    }
    if (target.id) {
        selectorProps.id = target.id;
    }
    if (target.className) {
        selectorProps.tagName = target.className;
    }
    if (target.nodeName) {
        selectorProps.nodeName = target.nodeName;
    }
    if (target.value) {
        selectorProps.value = target.value;
    }

    return {
        type: constants.ADD_SELECTOR,
        payload: {
            selectorProps
        }
    }
}

