import {combineReducers} from 'redux';
import Access from './access';
import Account from './account';
import Companies from './companies';
import Company from './company';
import Config from './config';
import Messages from './messages';
import News from './news';
import Pages from './pages';
import User from './user';

export default class Reactions {
    constructor() {
        this.access = new Access();
        this.account = new Account();
        this.config = new Config();
        this.companies = new Companies();
        this.company = new Company();
        this.messages = new Messages();
        this.news = new News();
        this.pages = new Pages();
        this.user = new User();
    }

    getReducers = () => combineReducers({
        access: this.access.reducer,
        account: this.account.reducer,
        config: this.config.reducer,
        companies: this.companies.reducer,
        company: this.company.reducer,
        messages: this.messages.reducer,
        news: this.news.reducer,
        pages: this.pages.reducer,
        user: this.user.reducer,
    });

    setStore = (store) => {
        this.access.setStore(store);
        this.account.setStore(store);
        this.config.setStore(store);
        this.companies.setStore(store);
        this.company.setStore(store);
        this.messages.setStore(store);
        this.news.setStore(store);
        this.pages.setStore(store);
        this.user.setStore(store);
    };

    init = () => {
        return Promise.all([
            this.user.init(),
            this.companies.init(),
            this.config.init(),
            this.news.init(),
            this.pages.init(),
        ]);
    };
}
