import * as _ from 'lodash';
import * as q from 'jquery';
import * as shortid from 'shortid';
import { store } from '../store';
import { menus } from '../core/config';
import { Stages } from '../store/props';
import { StateDef } from '../store/props';
const TweenLite = require("gsap");

export interface ActionsDef {
    showTopMenu(): { type: string };
    hiddeTopMenu(): { type: string };
    showSelectorMenu(): { type: string };
    hiddeSelectorMenu(): { type: string };
    hiddeSelectorMenu(): { type: string };
    selectStage(key: string): { type: string, key: string };
    createStage(): { type: string, stage: Stages };
    showSelectorsInfo(eve: JQueryEventObject): {
        type: string,
        payload: {
            hoverSelectorProps: {
                tagName: string,
                id: string,
                className: string,
                nodeName: string,
                value: string
            }
        }
    };

    addSelector(eve: JQueryEventObject,
        stagekey: string,
        uniqueSelector: string): {
            type: string,
            payload: {
                uniqueSelector: string,
                selector: {
                    tagName: string,
                    id: string,
                    className: string,
                    nodeName: string,
                    value: string
                }
            }
        };

    confirmSelector(key: string, stageKey: string): { type: string, stageKey: string };
    editSelector(key: string, stageKey: string): { type: string, stageKey: string };
    deleteSelector(key: string, stageKey: string): { type: string, stageKey: string };
    confirmEditSelector(key: string, stageKey: string): { type: string, stageKey: string };

    deleteStage(stageKey: string): { type: string, stageKey: string }
    editStage(stageKey: string): { type: string, stageKey: string }

    expandStage(stageKey: string): { type: string, stageKey: string }
    reduceStage(stageKey: string): { type: string, stageKey: string }

}

export const constants = {
    SHOW_MESSAGE: "SHOW_MESSAGE",
    SHOW_TOP_MENU: "SHOW_TOP_MENU",
    HIDDE_TOP_MENU: "HIDDE_TOP_MENU",
    SHOW_SELECTOR_MENU: "SHOW_SELECTOR_MENU",
    HIDDE_SELECTOR_MENU: "HIDDE_SELECTOR_MENU",
    SHOW_SELECTORS_INFO: "SHOW_SELECTORS_INFO",
    EXPAND_STAGE: "EXPAND_STAGE",
    REDUCE_STAGE: "REDUCE_STAGE",
    SELECT_STAGE: "SELECT_STAGE",
    CREATE_STAGE: "CREATE_STAGE",
    DELETE_STAGE: "DELETE_STAGE",
    EDIT_STAGE: "EDIT_STAGE",
    ADD_SELECTOR: "ADD_SELECTOR",
    CONFIRM_SELECTOR: "CONFIRM_SELECTOR",
    DELETE_SELECTOR: "DELETE_SELECTOR",
    EDIT_SELECTOR: "EDIT_SELECTOR",
    CONFIRM_EDIT_SELECTOR: "CONFIRM_EDIT_SELECTOR"
}

export function showTopMenu() {
    // SHOW AND ANIMATE CLIENT MAIN PANEL
    TweenLite.to("#__mad_topper_", menus.animationVelocity,
        {
            left: "0px"
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
            left: "-346px"
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


export function expandStage(stageKey: string) {
    q("#stageContainer" + stageKey).slideToggle("fast");

    return {
        type: constants.EXPAND_STAGE,
        stageKey
    }
}

export function reduceStage(stageKey: string) {
    q("#stageContainer" + stageKey).slideToggle("fast");

    return {
        type: constants.REDUCE_STAGE,
        stageKey
    }
}

export function deleteStage(key: string) {
    return {
        type: constants.DELETE_STAGE,
        key
    }
}

export function editStage(key: string) {
    return {
        type: constants.EDIT_STAGE,
        key
    }
}

export function selectStage(key: string) {
    return {
        type: constants.SELECT_STAGE,
        key
    }
}

export function createStage() {
    const newStage: any = {};
    newStage.keyid = shortid.generate();
    return {
        type: constants.CREATE_STAGE,
        stage: newStage
    }
}


export function showSelectorsInfo(eve: JQueryEventObject) {
    const hoverSelectorProps: any = {};
    const target: any = eve.target;

    if (eve.target.tagName) {
        hoverSelectorProps.tagName = eve.target.tagName;
    }
    if (eve.target.id) {
        hoverSelectorProps.id = eve.target.id;
    }
    if (eve.target.className) {
        hoverSelectorProps.className = eve.target.className;
    }
    if (eve.target.nodeName) {
        hoverSelectorProps.nodeName = eve.target.nodeName;
    }
    if (target.value) {
        hoverSelectorProps.value = target.value;
    }

    return {
        type: "SHOW_SELECTORS_INFO",
        payload: {
            hoverSelectorProps
        }
    }
}

export function addSelector(eve: JQueryEventObject, stageKey, uniqueSelector) {
    const newSelector: any = {};
    const target: any = eve.target;

    newSelector.stagekey = stageKey;
    newSelector.keyid = shortid.generate();
    newSelector.element = target;

    if (target.tagName) {
        newSelector.tagName = target.tagName;
    }
    if (target.id) {
        newSelector.id = target.id;
    }
    if (target.className) {
        newSelector.tagName = target.className;
    }
    if (target.nodeName) {
        newSelector.nodeName = target.nodeName;
    }
    if (target.value) {
        newSelector.value = target.value;
    }

    return (dispatch, getState: () => StateDef) => {
        
        const stages = getState().stages;
        const selectors = getState().selectorsStack;
        const findSelectorRepeat = _.find(selectors, (selector) => selector.element === target);
        
        if (stages.length <= 0) {
            
            dispatch({
                type: constants.SHOW_MESSAGE,
                message: "primero debes crear un stage"
            });

        } else if (findSelectorRepeat) {
           
            dispatch({
                type: constants.SHOW_MESSAGE,
                message: "el elemento ya se encuentra dentro de: " + _.find(stages, (stage)=> stage.keyid === findSelectorRepeat.stagekey).name
            });

        } else {

            dispatch({
                type: constants.ADD_SELECTOR,
                payload: {
                    selector: newSelector,
                    uniqueSelector
                }
            });
        }
    }
}

export function confirmSelector(key, stagekey) {
    return {
        type: constants.CONFIRM_SELECTOR,
        stagekey,
        key
    }
}

export function deleteSelector(key, stageKey) {
    return {
        type: constants.DELETE_SELECTOR,
        stageKey,
        key
    }
}

export function editSelector(key, stagekey) {
    return {
        type: constants.EDIT_SELECTOR,
        stagekey,
        key
    }
}

export function confirmEditSelector(key, element) {
    return {
        type: constants.CONFIRM_EDIT_SELECTOR,
        value: element.value,
        key
    }
}

