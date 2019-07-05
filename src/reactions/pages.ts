import { createAction, handleActions } from 'redux-actions';

interface IState {
    actions: any;
    data: any;
    error: any;
}

class Pages {
    store: any;

    constructor(private firebase: any) {}

    actions = {};

    initialState: IState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setPages = createAction('SET_PAGES');

    reducer = handleActions(
        {
            SET_PAGES: (state, action) => {
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
                .ref(`/pages`)
                .on('value', (snapshot: any) => {
                    this.store.dispatch(this.setPages(snapshot.val()));
                    resolve();
                });
        });
    };
}

export default Pages;
