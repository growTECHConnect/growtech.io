import { createAction, handleActions } from 'redux-actions';

class Config {

    actions = {};

    initialState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setConfig = createAction('SET_CONFIG');

    reducer = handleActions({
        SET_CONFIG: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
    }, this.initialState);

    setStore = (store) => {
        this.store = store;
    };

    init = () => {
        return new Promise((resolve) => {
            firebase.database().ref(`/config`).on('value', (snapshot) => {
                this.store.dispatch(this.setConfig(snapshot.val()));
                resolve();
            });
        });
    };
}

export default Config;