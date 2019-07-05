import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

interface IState {
    actions: any;
    accounts: null | any;
}

export default class Access {
    store: any;

    constructor(private firebase: any) {}

    actions = {
        getAccounts: () => {
            const { token } = this.store.getState().user.data;

            return axios({
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                method: 'get',
                url: '/api/admin/accounts',
            }).then(({ data }) => {
                this.store.dispatch(this.setAccounts(data));
            });
        },

        updateAccount: (uid: string, data: any) => {
            const { token } = this.store.getState().user.data;

            return axios({
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                method: 'put',
                url: `/api/admin/accounts/${uid}`,
                data,
            }).then(({ data }) => {
                this.store.dispatch(this.updateAccount(data));
            });
        },

        addAccount: (data: any) => {
            const { token } = this.store.getState().user.data;

            return axios({
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                method: 'post',
                url: `/api/admin/accounts`,
                data,
            })
                .then(({ data }) => {
                    this.store.dispatch(this.setAccounts(data));
                })
                .then(() => this.firebase.auth().sendPasswordResetEmail(data.email))
                .catch(({ response }) => {
                    const { error } = response.data;
                    throw error;
                });
        },

        updateCompanyApproval: (uid: string, value: any) => {
            const { token } = this.store.getState().user.data;

            return axios({
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                method: 'put',
                url: `/api/admin/companies/${uid}`,
                data: {
                    company: {
                        isApproved: !!value,
                    },
                },
            }).catch(({ response }) => {
                const { error } = response.data;
                throw error;
            });
        },
    };

    initialState: IState = {
        actions: this.actions,
        accounts: null,
    };

    setError = createAction('SET_ERROR');
    setAccounts = createAction('SET_ADMIN_ACCOUNTS');
    updateAccount = createAction('UPDATE_ADMIN_ACCOUNT');

    reducer = handleActions(
        {
            SET_ADMIN_ACCOUNTS: (state, action) => {
                return {
                    ...state,
                    accounts: action.payload,
                };
            },
            UPDATE_ADMIN_ACCOUNT: (state, action) => {
                const { uid }: any = action.payload;
                const { accounts } = state;

                accounts[uid] = {
                    ...state.accounts[uid],
                    ...action.payload,
                };

                return {
                    ...state,
                    accounts,
                };
            },
        },
        this.initialState
    );

    setStore = (store: any) => {
        this.store = store;
    };
}
