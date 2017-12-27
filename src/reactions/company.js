import { createAction, handleActions } from 'redux-actions';

class Company {

    actions = {
        init: (cid) => this.init(cid),
        update: (company) => {
            const {setStatus, setStatusSaved} = this.store.getState().messages.actions;
            const cid = this.store.getState().access.data.company;

            setStatus('Saving...');
            company.updatedAt = new Date().toISOString();

            return firebase.database().ref(`/companies/${cid}`).update(company).then(() => setStatusSaved());
        },
        updateMediaFiles: (files) => {
            const {setStatus, setStatusSaved} = this.store.getState().messages.actions;
            const cid = this.store.getState().access.data.company;
            const uploads = Object.keys(files).map((key) => {
                const {data_url, filename} = files[key];
                const fileRef = firebase.storage().ref(`/companies/${cid}/${filename}`);

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

            setStatus('Saving...');

            return Promise.all(uploads)
                .then((results) => {
                    const mediaFiles = {};

                    results.forEach((result) => {
                        mediaFiles[result.key] = {
                            ...result,
                        };
                    });

                    return firebase.database().ref(`/companies/${cid}/mediaFiles`).update(mediaFiles);
                })
                .then(() => setStatusSaved());
        },
    };

    initialState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setCompany = createAction('SET_COMPANY');

    reducer = handleActions({
        SET_COMPANY: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
    }, this.initialState);

    setStore = (store) => {
        this.store = store;
    };

    init = (cid) => {
        return new Promise((resolve) => {
            firebase.database().ref(`/companies/${cid}`).off();

            firebase.database().ref(`/companies/${cid}`).on('value', (snapshot) => {
                this.store.dispatch(this.setCompany({...snapshot.val(), id: cid}));
                resolve(snapshot.val());
            });
        });
    };
}

export default Company;
