import { createAction, handleActions } from 'redux-actions';

interface IState {
    data: any;
}

class Errors {
    store: any;

    actions = {
        clearError: (payload: any) => {
            this.store.dispatch(this.clearError(payload));
        },
        setError: (payload: any) => {
            this.store.dispatch(this.setError(payload));
        },
    };

    initialState: IState = {
        data: {},
    };

    clearError = createAction('CLEAR_ERROR');
    setError = createAction('SET_ERROR');

    reducer = handleActions(
        {
            CLEAR_ERROR: (state, action) => {
                const { key }: any = action.payload;
                const data = {
                    ...state.data,
                    [key]: null,
                };

                return { data };
            },
            SET_ERROR: (state, action) => {
                const { error, key }: any = action.payload;
                const data = {
                    ...state.data,
                    [key]: error,
                };

                return { data };
            },
        },
        this.initialState
    );

    setStore = (store: any) => {
        this.store = store;
    };

    init = () => {};
}

export default Errors;
