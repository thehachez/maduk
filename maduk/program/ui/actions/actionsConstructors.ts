import * as _ from 'lodash';

export const constants = {
    CONSTRUCTOR_FLOAT_OPEN: 'CONSTRUCTOR_FLOAT_OPEN',
    CONSTRUCTOR_FLOAT_CLOSE: 'CONSTRUCTOR_FLOAT_CLOSE',
    SET_BROWSERS_FOR_TESTS: 'SET_BROWSERS_FOR_TESTS',
    CREATE_NEW_CONSTRUCTOR: 'CREATE_NEW_CONSTRUCTOR'
}

var inAnimation = false;
export function constrcutorOpenFloat() {
    let panel; 
    if (document.getElementById("floatPanel") && !inAnimation) {
        panel = document.getElementById("floatPanel");
        panel.className = "floatConstructor_creator_in";
    }
    return {
        type: constants.CONSTRUCTOR_FLOAT_OPEN
    }
}

export function constrcutorCloseFloat(): Redux.Dispatch {
    let panel = document.getElementById("floatPanel");
    panel.className = "floatConstructor_creator_end";
    inAnimation = true;
    return dispatch => {
        panel.addEventListener("animationend", () => {
            inAnimation = false;
            dispatch({
                type: constants.CONSTRUCTOR_FLOAT_CLOSE
            });
        })
    }
}

export function setBrowsersForTest(browser: string) {
    return {
        type: constants.SET_BROWSERS_FOR_TESTS,
        payload: {
            browser: browser
        }
    }
}

export function createNewConstructor(formElements) {
    return {
        type: constants.CREATE_NEW_CONSTRUCTOR,
        elements: _.mapValues(formElements, "value")
    }
}
