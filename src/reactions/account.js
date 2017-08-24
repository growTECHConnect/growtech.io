import {createAction, handleActions} from 'redux-actions';

export default class Account {

    actions = {
        init: (uid) => this.init(uid),
        update: (account = {}) => {
            const {uid} = this.store.getState().user.data;

            account.updatedAt = new Date().toISOString();
            return firebase.database().ref(`account/${uid}`).update(account);
        },
    };

    initialState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setAccount = createAction('SET_ACCOUNT');

    reducer = handleActions({
        SET_ACCOUNT: (state, action) => {
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
            firebase.database().ref(`/account/${uid}`).off();

            firebase.database().ref(`/account/${uid}`).on('value', (snapshot) => {
                this.store.dispatch(this.setAccount(snapshot.val()));
                resolve(snapshot.val());
            });
        });
    };
}
