import {createAction, handleActions} from 'redux-actions';

class User {

    actions = {
        signUp: ({email, password}) => {
            return new Promise((resolve) => {
                firebase.auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(resolve)
                    .catch((error) => this.store.dispatch(this.setError(error)));
            });
        },
        signIn: ({email, password}) => {
            return new Promise((resolve) => {
                firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(resolve)
                    .catch((error) => this.store.dispatch(this.setError(error)));
            });
        },
        signOut: () => {
            return new Promise((resolve) => {
                firebase.auth()
                    .signOut()
                    .then(resolve)
                    .catch((error) => this.store.dispatch(this.setError(error)));
            });
        },
        passwordReset: (email) => {
            return new Promise((resolve) => {
                firebase.auth()
                    .sendPasswordResetEmail(email)
                    .then(resolve)
                    .catch((error) => this.store.dispatch(this.setError(error)));
            });
        }
    };

    initialState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setError = createAction('SET_ERROR');
    setUser = createAction('SET_USER');

    reducer = handleActions({
        SET_ERROR: (state, action) => {
            return {
                ...state,
                error: action.payload,
            }
        },
        SET_USER: (state, action) => {
            return {
                ...state,
                error: null,
                data: action.payload,
            };
        },
    }, this.initialState);

    setStore = (store) => {
        this.store = store;
    };

    init = () => {
        return new Promise((resolve) => {
            firebase.auth().onAuthStateChanged((user) => {
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
                        .then(() => resolve(user))
                        .catch((error) => console.log(error));
                }

                resolve(user);
            });
        });
    };
}

export default User;
