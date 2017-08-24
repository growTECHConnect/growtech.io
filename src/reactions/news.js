import { createAction, handleActions } from 'redux-actions';

class News {

    actions = {
        create: (gid, news) => {
            const newsRef = firebase.database().ref(`/news/${gid}`);
            const newsKey = newsRef.push().key;

            news.createdAt = new Date();
            newsRef.update({[newsKey]: news});
        },
        update: (gid, news) => {
            news.updatedAt = new Date();
            firebase.database().ref(`/news/${gid}/${news.key}`).update(news);
        },
    };

    initialState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setNews = createAction('NEWS_SET');

    reducer = handleActions({
        NEWS_SET: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
    }, this.initialState);

    setStore = (store) => {
        this.store = store;
    };

    init = (uid) => {
        return new Promise((resolve) => {
            firebase.database().ref(`/news/${gid}`).on('value', (snapshot) => {
                store.dispatch(this.action.set(snapshot.val()));
                resolve();
            });
        });
    };
}

export default News;