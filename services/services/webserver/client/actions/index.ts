import * as _ from 'lodash';

export interface ActionsDef {
    manageMainMenu(): { type: string }
}

export const constants = {
    MANAGE_MAIN_MENU: "MANAGE_MAIN_MENU"
}

export function manageMainMenu() {
    return {
        type: constants.MANAGE_MAIN_MENU
    }
}

