import {createAction, handleActions} from 'redux-actions';

class Errors {

    actions = {
        clearError: (payload) => {
            this.store.dispatch(this.clearError(payload));
        },
        setError: (payload) => {
            this.store.dispatch(this.setError(payload));
        },
    };

    initialState = {
        data: {},
    };

    clearError = createAction('CLEAR_ERROR');
    setError = createAction('SET_ERROR');

    reducer = handleActions({
        CLEAR_ERROR: (state, action) => {
            const {key} = action.payload;
            const data = {
                ...state.data,
                [key]: null,
            };

            return {data};
        },
        SET_ERROR: (state, action) => {
            const {error, key} = action.payload;
            const data = {
                ...state.data,
                [key]: error,
            };

            return {data};
        },
    }, this.initialState);

    setStore = (store) => {
        this.store = store;
    };

    init = () => {};
}

export default Errors;
