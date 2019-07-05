import { createAction, handleActions } from 'redux-actions';

interface IState {
    actions: any;
    data: null | any;
    error: null | any;
}

export default class Access {
    store: any;

    constructor(private firebase: any) {}

    actions = {
        init: (uid: string) => this.init(uid),
    };

    initialState: IState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setAccess = createAction('SET_ACCESS');

    reducer = handleActions(
        {
            SET_ACCESS: (state, action) => {
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
                .ref(`/access/${uid}`)
                .off();

            this.firebase
                .database()
                .ref(`/access/${uid}`)
                .on('value', (snapshot: any) => {
                    const access = snapshot.val();

                    if (access) {
                        this.store.dispatch(this.setAccess(access));
                        resolve(access);
                    }
                });
        });
    };
}
