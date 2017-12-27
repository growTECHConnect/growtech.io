import {createAction, handleActions} from 'redux-actions';

export default class Account {

    actions = {
        init: (uid) => this.init(uid),
        update: (account = {}) => {
            const {uid} = this.store.getState().user.data;
            const {setStatus, setStatusSaved} = this.store.getState().messages.actions;

            setStatus('Saving...');
            account.updatedAt = new Date().toISOString();

            return firebase.database().ref(`account/${uid}`).update(account).then(() => setStatusSaved());
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
                const account = snapshot.val();

                if (account) {
                    this.store.dispatch(this.setAccount(account));
                    resolve(account);
                }
            });
        });
    };
}
