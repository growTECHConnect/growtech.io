import { createAction, handleActions } from 'redux-actions';

import uuidv1 from 'uuid/v1';

interface IState {
    actions: any;
    data: any;
    error: any;
}

class Company {
    store: any;

    constructor(private firebase: any) {}

    actions = {
        init: (cid: string) => this.init(cid),
        update: (company: any) => {
            const { setStatus, setStatusSaved } = this.store.getState().messages.actions;
            const cid = this.store.getState().access.data.company;

            setStatus('Saving...');
            company.updatedAt = new Date().toISOString();

            return this.firebase
                .database()
                .ref(`/companies/${cid}`)
                .update(company)
                .then(() => setStatusSaved());
        },
        updateMediaFiles: (files: any) => {
            const { setStatus, setStatusSaved } = this.store.getState().messages.actions;
            const cid = this.store.getState().access.data.company;
            const uploads = Object.keys(files).map((key) => {
                const { data_url, filename } = files[key];
                const fileRef = this.firebase.storage().ref(`/companies/${cid}/${uuidv1()}-${filename}`);

                return fileRef.putString(data_url, 'data_url').then((snapshot: any) => {
                    return fileRef.getDownloadURL().then(function(url) {
                        return {
                            name: filename,
                            size: snapshot.metadata.size,
                            state: 'success',
                            key,
                            url,
                        };
                    });
                });
            });

            setStatus('Saving...');

            return Promise.all(uploads)
                .then((results) => {
                    const mediaFiles: any = {};

                    results.forEach((result) => {
                        mediaFiles[result.key] = {
                            ...result,
                        };
                    });

                    return this.firebase
                        .database()
                        .ref(`/companies/${cid}/mediaFiles`)
                        .update(mediaFiles);
                })
                .then(() => setStatusSaved());
        },
    };

    initialState: IState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setCompany = createAction('SET_COMPANY');

    reducer = handleActions(
        {
            SET_COMPANY: (state, action) => {
                return {
                    ...state,
                    data: action.payload,
                };
            },
        },
        this.initialState
    );

    setStore = (store: any) => {
        this.store = store;
    };

    init = (cid: string) => {
        return new Promise((resolve) => {
            this.firebase
                .database()
                .ref(`/companies/${cid}`)
                .off();

            this.firebase
                .database()
                .ref(`/companies/${cid}`)
                .on('value', (snapshot: any) => {
                    this.store.dispatch(this.setCompany({ ...snapshot.val(), id: cid }));
                    resolve(snapshot.val());
                });
        });
    };
}

export default Company;
