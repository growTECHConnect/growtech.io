import { createAction, handleActions } from 'redux-actions';

class Companies {

    actions = {};

    initialState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setCompanies = createAction('SET_COMPANIES');

    reducer = handleActions({
        SET_COMPANIES: (state, action) => {
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
            firebase.database().ref(`/companies`).on('value', (snapshot) => {
                this.store.dispatch(this.setCompanies(snapshot.val()));
                resolve();
            });
        });
    };
}

export default Companies;