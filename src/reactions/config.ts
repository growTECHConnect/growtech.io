import { createAction, handleActions } from 'redux-actions';

interface IState {
    actions: any;
    data: any;
    error: any;
}

class Config {
    store: any;

    constructor(private firebase: any) {}

    actions = {};

    initialState: IState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setConfig = createAction('SET_CONFIG');

    reducer = handleActions(
        {
            SET_CONFIG: (state, action) => {
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

    init = () => {
        return new Promise((resolve) => {
            this.firebase
                .database()
                .ref(`/config`)
                .on('value', (snapshot: any) => {
                    this.store.dispatch(this.setConfig(snapshot.val()));
                    resolve();
                });
        });
    };
}

export default Config;
