import { combineReducers } from 'redux';
import * as firebase from 'firebase';
import Access from './access';
import Account from './account';
import Admin from './admin';
import Companies from './companies';
import Company from './company';
import Config from './config';
import Errors from './errors';
import Messages from './messages';
import News from './news';
import Pages from './pages';
import User from './user';

export default class Reactions {
    access: any;
    account: any;
    admin: any;
    config: any;
    companies: any;
    company: any;
    errors: any;
    messages: any;
    news: any;
    pages: any;
    user: any;

    constructor() {
        const firebaseApp = firebase.initializeApp({
            apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
            databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
            projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
        });

        this.access = new Access(firebaseApp);
        this.account = new Account(firebaseApp);
        this.admin = new Admin(firebaseApp);
        this.config = new Config(firebaseApp);
        this.companies = new Companies(firebaseApp);
        this.company = new Company(firebaseApp);
        this.errors = new Errors();
        this.messages = new Messages();
        this.news = new News(firebaseApp);
        this.pages = new Pages(firebaseApp);
        this.user = new User(firebaseApp);
    }

    getReducers = () =>
        combineReducers({
            access: this.access.reducer,
            account: this.account.reducer,
            admin: this.admin.reducer,
            config: this.config.reducer,
            companies: this.companies.reducer,
            company: this.company.reducer,
            errors: this.errors.reducer,
            messages: this.messages.reducer,
            news: this.news.reducer,
            pages: this.pages.reducer,
            user: this.user.reducer,
        });

    setStore = (store: any) => {
        this.access.setStore(store);
        this.account.setStore(store);
        this.admin.setStore(store);
        this.config.setStore(store);
        this.companies.setStore(store);
        this.company.setStore(store);
        this.errors.setStore(store);
        this.messages.setStore(store);
        this.news.setStore(store);
        this.pages.setStore(store);
        this.user.setStore(store);
    };

    init = () => {
        return Promise.all([this.user.init(), this.companies.init(), this.config.init(), this.news.init(), this.pages.init()]);
    };
}
