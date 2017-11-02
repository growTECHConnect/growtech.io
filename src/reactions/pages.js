import { createAction, handleActions } from 'redux-actions';

class Pages {

    actions = {};

    initialState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setPages = createAction('SET_PAGES');

    reducer = handleActions({
        SET_PAGES: (state, action) => {
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
            firebase.database().ref(`/pages`).on('value', (snapshot) => {
                this.store.dispatch(this.setPages(snapshot.val()));
                resolve();
            });
        });
    };
}

export default Pages;
