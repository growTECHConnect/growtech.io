import {
    createStore,
    applyMiddleware,
} from 'redux';
import { handleActions } from 'redux-actions';
import logger from 'redux-logger';

const initialState = {
    account: null,
    config: null,
    companies: null,
    company: null,
    error: null,
    events: null,
    initialized: {
        user: false,
        account: false,
        company: false,
        news: false,
        events: false,
        config: false,
        companies: false,
    },
    news: null,
    user: null,
};

const reducer = handleActions({
    ERROR: (state, action) => {
        return {
            ...state,
            error: action.error,
        };
    },
    CLEAR: (state, action) => (initialState),
    ACCOUNT_SET: (state, action) => {
        return {
            ...state,
            account: action.payload,
            error: null,
            initialized: {
                ...state.initialized,
                account: true,
            },
        };
    },
    CONFIG_SET: (state, action) => {
        return {
            ...state,
            config: action.payload,
            error: null,
            initialized: {
                ...state.initialized,
                config: true,
            },
        };
    },
    COMPANIES_SET: (state, action) => {
        return {
            ...state,
            companies: action.payload,
            error: null,
            initialized: {
                ...state.initialized,
                companies: true,
            },
        };
    },
    COMPANY_SET: (state, action) => {
        return {
            ...state,
            company: action.payload,
            error: null,
            initialized: {
                ...state.initialized,
                company: true,
            },
        };
    },
    EVENTS_SET: (state, action) => {
        return {
            ...state,
            error: null,
            initialized: {
                ...state.initialized,
                events: true,
            },
            events: action.payload,
        };
    },
    NEWS_SET: (state, action) => {
        return {
            ...state,
            error: null,
            initialized: {
                ...state.initialized,
                news: true,
            },
            news: action.payload,
        };
    },
    USER_SET: (state, action) => {
        return {
            ...state,
            error: null,
            initialized: {
                ...state.initialized,
                user: true,
            },
            user: action.payload,
        };
    },
}, initialState);

export default createStore(reducer, applyMiddleware(logger));
