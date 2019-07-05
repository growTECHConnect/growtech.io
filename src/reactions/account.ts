import { createAction, handleActions } from 'redux-actions';

interface IState {
    actions: any;
    data: null | any;
    error: null | any;
}

export default class Account {
    store: any;
    updatedAt: any;

    constructor(private firebase: any) {}

    actions = {
        init: (uid: string) => this.init(uid),
        update: (account: any = {}) => {
            const { uid } = this.store.getState().user.data;
            const { setStatus, setStatusSaved } = this.store.getState().messages.actions;

            setStatus('Saving...');
            account.updatedAt = new Date().toISOString();

            return this.firebase
                .database()
                .ref(`account/${uid}`)
                .update(account)
                .then(() => setStatusSaved());
        },
    };

    initialState: IState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setAccount = createAction('SET_ACCOUNT');

    reducer = handleActions(
        {
            SET_ACCOUNT: (state, action) => {
                return {
                    ...state,
                    data: action.payload,
                };
            },
        },
        this.initialState
    );

    setStore = (store: any) => {
        this.store = store;
    };

    init = (uid: string) => {
        return new Promise((resolve) => {
            this.firebase
                .database()
                .ref(`/account/${uid}`)
                .off();

            this.firebase
                .database()
                .ref(`/account/${uid}`)
                .on('value', (snapshot: any) => {
                    const account = snapshot.val();

                    if (account) {
                        this.store.dispatch(this.setAccount(account));
                        resolve(account);
                    }
                });
        });
    };
}
