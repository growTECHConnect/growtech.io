import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

interface IState {
    actions: any;
    data: any;
    error: any;
}

class User {
    store: any;

    constructor(private firebase: any) {}

    actions = {
        signUp: ({ email, password }: any) => {
            return new Promise((resolve) => {
                this.firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(({ email, uid }: any) => {
                        return axios({
                            headers: {
                                Accept: 'application/json',
                            },
                            method: 'post',
                            url: `${process.env.REACT_APP_API_HOST}/signup`,
                            data: { email, uid },
                        });
                    })
                    .then(resolve)
                    .catch((error: any) => this.store.dispatch(this.setError(error)));
            });
        },
        signIn: ({ email, password }: any) => {
            return new Promise((resolve) => {
                this.firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(resolve)
                    .catch((error: any) => this.store.dispatch(this.setError(error)));
            });
        },
        signOut: () => {
            return new Promise((resolve) => {
                this.firebase
                    .auth()
                    .signOut()
                    .then(resolve)
                    .catch((error: any) => this.store.dispatch(this.setError(error)));
            });
        },
        passwordReset: (email: string) => {
            return new Promise((resolve) => {
                this.firebase
                    .auth()
                    .sendPasswordResetEmail(email)
                    .then(resolve)
                    .catch((error: any) => this.store.dispatch(this.setError(error)));
            });
        },
        getToken: () => {
            return Promise.resolve(this.firebase.auth().currentUser.getIdToken());
        },
    };

    initialState: IState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setError = createAction('SET_USER_ERROR');
    setUser = createAction('SET_USER');

    reducer = handleActions(
        {
            SET_USER_ERROR: (state, action) => {
                return {
                    ...state,
                    error: action.payload,
                };
            },
            SET_USER: (state, action) => {
                return {
                    ...state,
                    error: null,
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
            this.firebase.auth().onAuthStateChanged((user: any) => {
                this.store.dispatch(this.setUser(user));

                if (user && user.uid) {
                    return Promise.all([
                        this.store.getState().access.actions.init(user.uid),
                        this.store.getState().account.actions.init(user.uid),
                    ])
                        .then((results) => {
                            const cid = results[0].company || null;

                            if (cid) {
                                return this.store.getState().company.actions.init(cid);
                            }
                        })
                        .then(() => this.firebase.auth().currentUser.getIdToken())
                        .then((token) => {
                            user.token = token;
                            resolve(user);
                        })
                        .catch((error) => console.log(error));
                }

                resolve(user);
            });
        });
    };
}

export default User;
