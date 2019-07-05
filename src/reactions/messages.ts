import { createAction, handleActions } from 'redux-actions';

interface IState {
    actions: any;
    status: any;
}

class Messages {
    store: any;

    actions = {
        setStatus: (status: any) => {
            this.store.dispatch(this.setStatus(status));
        },
        setStatusSaved: () => {
            this.store.dispatch(this.setStatus('Saved'));

            setTimeout(() => {
                this.store.dispatch(this.setStatus(null));
            }, 5000);
        },
    };

    initialState: IState = {
        actions: this.actions,
        status: null,
    };

    setStatus = createAction('SET_STATUS');

    reducer = handleActions(
        {
            SET_STATUS: (state, action) => {
                return {
                    ...state,
                    status: action.payload,
                };
            },
        },
        this.initialState
    );

    setStore = (store: any) => {
        this.store = store;
    };

    init = () => {};
}

export default Messages;
