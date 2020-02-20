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
        readNews: () => {
            return this.firebase
                .database()
                .ref(`/news`)
                .once('value')
                .then((snapshot: any) => {
                    const data = snapshot.val();

                    return this.store.dispatch(this.setNews(data));
                });
        },
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
                        .set(data);
                });
        },
        delete: (index: number) => {
            return this.firebase
                .database()
                .ref('/news')
                .child(index)
                .remove();
        },
        update: (index: number, news: News) => {
            return this.firebase
                .database()
                .ref('/news')
                .child(index)
                .update(news);
        },
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
