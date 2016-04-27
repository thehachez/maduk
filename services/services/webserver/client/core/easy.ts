import { store } from '../store';
import { StateDef } from '../store/props';

const EasyRedux = {
    get state(): StateDef {
        return store.getState();
    },
    disp(action) {
        return store.dispatch(action);
    }
};

export const E = EasyRedux;