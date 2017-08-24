import { createAction, handleActions } from 'redux-actions';

export default class Access {

    actions = {
        init: (uid) => this.init(uid),
    };

    initialState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setAccess = createAction('SET_ACCESS');

    reducer = handleActions({
        SET_ACCESS: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
    }, this.initialState);

    setStore = (store) => {
        this.store = store;
    };

    init = (uid) => {
        return new Promise((resolve) => {
            firebase.database().ref(`/access/${uid}`).off();

            firebase.database().ref(`/access/${uid}`).on('value', (snapshot) => {
                this.store.dispatch(this.setAccess(snapshot.val()));
                resolve(snapshot.val());
            });
        });
    };
}
