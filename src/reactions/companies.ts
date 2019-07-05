import { createAction, handleActions } from 'redux-actions';

interface IState {
    actions: any;
    data: any;
    error: any;
}

class Companies {
    store: any;

    constructor(private firebase: any) {}

    actions = {};

    initialState: IState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setCompanies = createAction('SET_COMPANIES');

    reducer = handleActions(
        {
            SET_COMPANIES: (state, action) => {
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
                .ref(`/companies`)
                .on('value', (snapshot: any) => {
                    this.store.dispatch(this.setCompanies(snapshot.val()));
                    resolve();
                });
        });
    };
}

export default Companies;
