import {combineReducers} from 'redux';
import Access from './access';
import Account from './account';
import Companies from './companies';
import Company from './company';
import Config from './config';
import Events from './events';
import User from './user';

export default class Reactions {
    constructor() {
        this.access = new Access();
        this.account = new Account();
        this.config = new Config();
        this.companies = new Companies();
        this.company = new Company();
        this.events = new Events();
        this.user = new User();
    }

    getReducers = () => combineReducers({
        access: this.access.reducer,
        account: this.account.reducer,
        config: this.config.reducer,
        companies: this.companies.reducer,
        company: this.company.reducer,
        events: this.events.reducer,
        user: this.user.reducer,
    });

    setStore = (store) => {
        this.access.setStore(store);
        this.account.setStore(store);
        this.config.setStore(store);
        this.companies.setStore(store);
        this.company.setStore(store);
        this.events.setStore(store);
        this.user.setStore(store);
    };

    init = () => {
        return Promise.all([
            this.user.init(),
            this.companies.init(),
            this.config.init(),
        ]);
    };
}