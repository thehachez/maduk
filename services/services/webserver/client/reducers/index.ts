import { combineReducers } from 'redux';
import { constants } from '../actions';
import { menus } from '../core/config';
import * as $ from 'jquery';

function mangeMenu(state = false, action): boolean {
    switch (action.type) {
        case constants.MANAGE_MAIN_MENU:
            const menu = $("#__root_maduk_");
            
            if (!state) {
                menu.animate({
                    height: "60px"
                }, menus.animationVelocity);

                return true;
            }
            
            menu.animate({
                height: "0px"
            }, menus.animationVelocity);
            return false;

        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    mangeMenu,
});

