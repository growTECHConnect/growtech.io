import { createAction } from 'redux-actions';
import store from './store';


class User {
    constructor() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                store.dispatch(this.action.set(user));
                actions.account.setWatch(user.uid);
            } else {
                store.dispatch(this.action.clear());
                actions.account.clearWatch();
                actions.company.clearWatch();
                actions.news.clearWatch();
                actions.events.clearWatch();
            }
        });
    }

    action = {
        clear: createAction('CLEAR'),
        set: createAction('USER_SET', (user) => {
            if (user) {
                const { email, emailVerified, uid } = user;
                return { email, emailVerified, uid };
            } else {
                return null;
            }
        }),
    };

    signUp = ({ email, password }) => {
        return new Promise((resolve) => {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then((user) => user.sendEmailVerification())
                .then(resolve)
                .catch((error) => store.dispatch({type: 'ERROR', error}));
        });
    };

    signIn = ({ email, password }) => {
        return new Promise((resolve) => {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(resolve)
                .catch((error) => store.dispatch({type: 'ERROR', error}));
        });
    };

    signOut = () => {
        return new Promise((resolve) => {
            firebase.auth()
                .signOut()
                .then(resolve)
                .catch((error) => store.dispatch({type: 'ERROR', error}));
        });
    };
}

class Account {
    watch = false;

    action = {
        set: createAction('ACCOUNT_SET'),
    };

    setWatch = (uid) => {
        if (!this.watch) {
            this.watch = firebase.database().ref(`/account/${uid}`).on('value', (snapshot) => {
                const account = snapshot.val();

                if (account) {
                    store.dispatch(this.action.set(account));
                    actions.company.setWatch(account.group);
                    actions.news.setWatch(account.group);
                    actions.events.setWatch(account.group);
                }
            });
        }
    };

    clearWatch = () => {
        if (this.watch) {
            firebase.database().ref(`/account`).off('value', this.watch);
            this.watch = false;
        }
    };

    update = (uid, { firstName, lastName, email, phone }) => {
        firebase.database().ref(`account/${uid}`).update({ firstName, lastName, email, phone, updatedAt: new Date() });
    };
}

class Company {
    watch = false;

    action = {
        set: createAction('COMPANY_SET'),
    };

    setWatch = (gid) => {
        if (!this.watch) {
            this.watch = firebase.database().ref(`/companies/${gid}`).on('value', (snapshot) => {
                const company = snapshot.val();

                if (company) {
                    store.dispatch(this.action.set(company));
                }
            });
        }
    };

    clearWatch = () => {
        if (this.watch) {
            firebase.database().ref(`/companies`).off('value', this.watch);
            this.watch = false;
        }
    };

    update = (gid, company) => {
        company.updatedAt = new Date();
        firebase.database().ref(`/companies/${gid}`).update(company);
    };

    updateMediaFiles = (gid, files) => {
        const uploads = Object.keys(files).map((key) => {
            const { data_url, filename } = files[key];
            const fileRef = firebase.storage().ref(`/companies/${gid}/${filename}`);

            return fileRef.putString(data_url, 'data_url')
                .then((snapshot) => {
                    return {
                        url: snapshot.metadata.downloadURLs[0],
                        name: snapshot.metadata.name,
                        size: snapshot.metadata.size,
                        state: snapshot.state,
                        key,
                    };
                })
        });

        return Promise.all(uploads)
            .then((results) => {
                const mediaFiles = {};

                results.forEach((result) => {
                    mediaFiles[result.key] = {
                        ...result,
                    };
                });

                return firebase.database().ref(`/companies/${gid}/mediaFiles`).update(mediaFiles);
            });
    }
}

class News {
    watch = false;

    action = {
        set: createAction('NEWS_SET'),
    };

    setWatch = (gid) => {
        if (!this.watch) {
            this.watch = firebase.database().ref(`/news/${gid}`).on('value', (snapshot) => {
                const news = snapshot.val();

                if (news) {
                    store.dispatch(this.action.set(news));
                }
            });
        }
    };

    clearWatch = () => {
        if (this.watch) {
            firebase.database().ref(`/news`).off('value', this.watch);
            this.watch = false;
        }
    };

    create = (gid, news) => {
        const newsRef = firebase.database().ref(`/news/${gid}`);
        const newsKey = newsRef.push().key;

        news.createdAt = new Date();
        newsRef.update({[newsKey]: news});
    };

    update = (gid, news) => {
        news.updatedAt = new Date();
        firebase.database().ref(`/news/${gid}/${news.key}`).update(news);
    };
}

class Events {
    watch = false;

    action = {
        set: createAction('EVENTS_SET'),
    };

    setWatch = (gid) => {
        if (!this.watch) {
            this.watch = firebase.database().ref(`/events/${gid}`).on('value', (snapshot) => {
                const events = snapshot.val();

                if (events) {
                    store.dispatch(this.action.set(events));
                }
            });
        }
    };

    clearWatch = () => {
        if (this.watch) {
            firebase.database().ref(`/events`).off('value', this.watch);
            this.watch = false;
        }
    };

    create = (gid, events) => {
        const eventsRef = firebase.database().ref(`/events/${gid}`);
        const eventsKey = eventsRef.push().key;

        events.createdAt = new Date();
        eventsRef.update({[eventsKey]: events});
    };

    update = (gid, events) => {
        events.updatedAt = new Date();
        firebase.database().ref(`/events/${gid}/${events.key}`).update(events);
    };
}

class Config {
    watch = false;

    constructor() {
        this.setWatch();
    }

    action = {
        set: createAction('CONFIG_SET'),
    };

    setWatch = () => {
        if (!this.watch) {
            this.watch = firebase.database().ref(`/config`).on('value', (snapshot) => {
                const config = snapshot.val();

                if (config) {
                    store.dispatch(this.action.set(config));
                }
            });
        }
    };

    clearWatch = () => {
        if (this.watch) {
            firebase.database().ref(`/config`).off('value', this.watch);
            this.watch = false;
        }
    };
}

class Companies {
    watch = false;

    constructor() {
        this.setWatch();
    }

    action = {
        set: createAction('COMPANIES_SET'),
    };

    setWatch = () => {
        if (!this.watch) {
            this.watch = firebase.database().ref(`/companies`).on('value', (snapshot) => {
                const companies = snapshot.val();

                if (companies) {
                    store.dispatch(this.action.set(companies));
                }
            });
        }
    };

    clearWatch = () => {
        if (this.watch) {
            firebase.database().ref(`/companies`).off('value', this.watch);
            this.watch = false;
        }
    };
}

const actions = {
    user: new User(),
    account: new Account(),
    config: new Config(),
    companies: new Companies(),
    company: new Company(),
    news: new News(),
    events: new Events(),
};

export default actions;