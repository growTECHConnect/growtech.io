import {createAction, handleActions} from 'redux-actions';

class News {

    actions = {
        create: (gid, news) => {
            const newsRef = firebase.database().ref(`/news/${gid}`);
            const newsKey = newsRef.push().key;

            news.createdAt = new Date();
            newsRef.update({[newsKey]: news});
        },
        // update: (gid, news) => {
        //     news.updatedAt = new Date();
        //     firebase.database().ref(`/news/${gid}/${news.key}`).update(news);
        // },
    };

    initialState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setNews = createAction('SET_NEWS');

    reducer = handleActions({
        SET_NEWS: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
    }, this.initialState);

    setStore = (store) => {
        this.store = store;
    };

    init = () => {
        return new Promise((resolve) => {
            firebase.database().ref(`/news`).on('value', (snapshot) => {
                this.store.dispatch(this.setNews(snapshot.val()));
                resolve();
            });
        });
    };
}

export default News;
