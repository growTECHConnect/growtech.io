import { createAction, handleActions } from 'redux-actions';

interface IState {
    actions: any;
    data: any;
    error: any;
}

interface News {
    body: string;
    date: string;
    title: string;
}

class News {
    store: any;

    constructor(private firebase: any) {}

    actions = {
        create: (news: News) => {
            return this.firebase
                .database()
                .ref('/news')
                .once('value', (snapshot: any) => {
                    const data = snapshot.val();

                    data.push(news);

                    return this.firebase
                        .database()
                        .ref('/news')
                        .update(data);
                });
        },
        // update: (gid, news) => {
        //     news.updatedAt = new Date();
        //     firebase.database().ref(`/news/${gid}/${news.key}`).update(news);
        // },
    };

    initialState: IState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setNews = createAction('SET_NEWS');

    reducer = handleActions(
        {
            SET_NEWS: (state, action) => {
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

    init = () => {
        return new Promise((resolve) => {
            this.firebase
                .database()
                .ref(`/news`)
                .on('value', (snapshot: any) => {
                    this.store.dispatch(this.setNews(snapshot.val()));
                    resolve();
                });
        });
    };
}

export default News;
