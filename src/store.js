import {
    createStore,
    applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
import Reactions from './reactions';

const configureStore = () => {
    const reactions = new Reactions();
    const store = createStore(reactions.getReducers()); //, applyMiddleware(logger));

    reactions.setStore(store);

    return { reactions, store };
};

export default configureStore;
