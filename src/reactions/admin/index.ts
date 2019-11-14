import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

interface IState {
    actions: any;
    accounts: null | any;
    requests: null | any;
}

export default class Access {
    store: any;

    constructor(private firebase: any) {}

    actions = {
        readAccounts: () => {
            const { token } = this.store.getState().user.data;

            return axios({
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                method: 'get',
                url: `${process.env.REACT_APP_API_HOST}/admin/accounts`,
                withCredentials: true,
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
                url: `${process.env.REACT_APP_API_HOST}/admin/accounts/${uid}`,
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
                url: `${process.env.REACT_APP_API_HOST}/admin/accounts`,
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
                url: `${process.env.REACT_APP_API_HOST}/admin/companies/${uid}`,
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

        readRequests: () => {
            const readRequests = this.firebase.functions().httpsCallable('admin-readRequests');

            return readRequests().then(({ data }: any) => {
                this.store.dispatch(this.setRequests(data));
            });
        },
    };

    initialState: IState = {
        actions: this.actions,
        accounts: null,
        requests: null,
    };

    setError = createAction('SET_ERROR');
    setAccounts = createAction('SET_ADMIN_ACCOUNTS');
    setRequests = createAction('SET_ADMIN_REQUESTS');
    updateAccount = createAction('UPDATE_ADMIN_ACCOUNT');

    reducer = handleActions(
        {
            SET_ADMIN_ACCOUNTS: (state, action) => {
                return {
                    ...state,
                    accounts: action.payload,
                };
            },
            SET_ADMIN_REQUESTS: (state, action) => {
                return {
                    ...state,
                    requests: action.payload,
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
