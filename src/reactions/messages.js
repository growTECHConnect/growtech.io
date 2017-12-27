import {createAction, handleActions} from 'redux-actions';

class Messages {

    actions = {
        setStatus: (status) => {
            this.store.dispatch(this.setStatus(status));
        },
        setStatusSaved: () => {
            this.store.dispatch(this.setStatus('Saved'));

            setTimeout(() => {
                this.store.dispatch(this.setStatus(null));
            }, 5000)
        },
    };

    initialState = {
        actions: this.actions,
        status: null,
    };

    setStatus = createAction('SET_STATUS');

    reducer = handleActions({
        SET_STATUS: (state, action) => {
            return {
                ...state,
                status: action.payload,
            };
        },
    }, this.initialState);

    setStore = (store) => {
        this.store = store;
    };

    init = () => {};
}

export default Messages;
