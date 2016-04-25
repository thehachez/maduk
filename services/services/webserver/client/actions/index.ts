import * as _ from 'lodash';
import * as q from 'jquery';
import { menus } from '../core/config';

export interface ActionsDef {
    manageMainMenu(): { type: string }
}

export const constants = {
    SHOW_TOP_MENU: "SHOW_TOP_MENU",
    HIDDE_TOP_MENU: "HIDDE_TOP_MENU",
    SHOW_SELECTORS_INFO: "SHOW_SELECTORS_INFO",
    ADD_SELECTOR: "ADD_SELECTOR"
}

export function showTopMenu() {
    const menu = q("#__mad_topper_");
    // SHOW AND ANIMATE CLIENT MAIN PANEL
    menu.animate({
        width: "25%"
    }, menus.animationVelocity);

    return {
        type: constants.SHOW_TOP_MENU
    }
}

export function hiddeTopMenu() {
    const menu = q("#__mad_topper_");
    // SHOW AND ANIMATE CLIENT MAIN PANEL
    menu.css({
        width: "25%"
    }).animate({
        width: "0%"
    }, menus.animationVelocity);

    return {
        type: constants.HIDDE_TOP_MENU
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
    
    selectorProps.uselector = uniqueSelector;
    
    if (eve.target.tagName) {
        selectorProps.tagName = eve.target.tagName;
    }
    if (eve.target.id) {
        selectorProps.id = eve.target.id;
    }
    if (eve.target.className) {
        selectorProps.tagName = eve.target.className;
    }
    if (eve.target.nodeName) {
        selectorProps.nodeName = eve.target.nodeName;
    }
    
    return {
        type: constants.ADD_SELECTOR,
        payload: {
            selectorProps
        }
    }
}

