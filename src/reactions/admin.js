import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

export default class Access {

    actions = {
        getAccounts: () => {
            const {token} = this.store.getState().user.data;

            return axios({
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                method: 'get',
                url: '/api/admin/accounts',
            })
                .then(({data}) => {
                    this.store.dispatch(this.setAccounts(data));
                });
        },
        updateAccount: (uid, data) => {
            const {token} = this.store.getState().user.data;

            return axios({
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                method: 'put',
                url: `/api/admin/accounts/${uid}`,
                data,
            })
                .then(({data}) => {
                    this.store.dispatch(this.updateAccount(data));
                });
        },
        addAccount: (data) => {
            const {token} = this.store.getState().user.data;

            return axios({
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                method: 'post',
                url: `/api/admin/accounts`,
                data,
            })
                .then(({data}) => {
                    this.store.dispatch(this.setAccounts(data));
                })
                .then(() => firebase.auth().sendPasswordResetEmail(data.email))
                .catch(({response}) => {
                    const {error} = response.data;
                    throw error;
                });
        }
    };

    initialState = {
        actions: this.actions,
        accounts: null,
    };

    setError = createAction('SET_ERROR');
    setAccounts = createAction('SET_ADMIN_ACCOUNTS');
    updateAccount = createAction('UPDATE_ADMIN_ACCOUNT');

    reducer = handleActions({
        SET_ADMIN_ACCOUNTS: (state, action) => {
            return {
                ...state,
                accounts: action.payload,
            };
        },
        UPDATE_ADMIN_ACCOUNT: (state, action) => {
            const {uid} = action.payload;
            const {accounts} = state;

            accounts[uid] = {
                ...state.accounts[uid],
                ...action.payload,
            };

            return {
                ...state,
                accounts,
            };
        }
    }, this.initialState);

    setStore = (store) => {
        this.store = store;
    };
}
