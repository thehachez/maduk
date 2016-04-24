import * as _ from 'lodash';
import * as q from 'jquery';
import { menus } from '../core/config';

export interface ActionsDef {
    manageMainMenu(): { type: string }
}

export const constants = {
    SHOW_TOP_MENU: "SHOW_TOP_MENU",
    HIDDE_TOP_MENU: "HIDDE_TOP_MENU",
    SHOW_SELECTORS_INFO: "SHOW_SELECTORS_INFO"
}

export function showTopMenu() {
    const menu = q("#__mad_topper_");
    // SHOW AND ANIMATE CLIENT MAIN PANEL
    menu.animate({
        height: "60px"
    }, menus.animationVelocity);

    return {
        type: constants.SHOW_TOP_MENU
    }
}

export function hiddeTopMenu() {
    const menu = q("#__mad_topper_");
    // SHOW AND ANIMATE CLIENT MAIN PANEL
    menu.css({
        height: "60px"
    }).animate({
        height: "0px"
    }, menus.animationVelocity);

    return {
        type: constants.HIDDE_TOP_MENU
    }
}

export function showSelectorsInfo(event: JQueryEventObject) {
    const selectorProps: any = {};

    if (event.target.tagName) {
        selectorProps.tagName = event.target.tagName;
    }
    if (event.target.id) {
        selectorProps.id = event.target.id;
    }
    if (event.target.className) {
        selectorProps.tagName = event.target.className;
    }
    if (event.target.nodeName) {
        selectorProps.nodeName = event.target.nodeName;
    }

    return {
        type: constants.SHOW_SELECTORS_INFO,
        payload: {
            selectorProps
        }
    }
}

