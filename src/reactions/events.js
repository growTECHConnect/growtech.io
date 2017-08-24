import {createAction, handleActions} from 'redux-actions';

class Events {

    actions = {
        create: (gid, events) => {
            const eventsRef = firebase.database().ref(`/events/${gid}`);
            const eventsKey = eventsRef.push().key;

            events.createdAt = new Date();
            eventsRef.update({[eventsKey]: events});
        },
        update: (gid, events) => {
            events.updatedAt = new Date();
            firebase.database().ref(`/events/${gid}/${events.key}`).update(events);
        },
    };

    initialState = {
        actions: this.actions,
        data: null,
        error: null,
    };

    setEvents = createAction('EVENTS_SET');

    reducer = handleActions({
        EVENTS_SET: (state, action) => {
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
            firebase.database().ref(`/events/${gid}`).on('value', (snapshot) => {
                store.dispatch(this.action.set(snapshot.val()));
                resolve();
            });
        });
    };
}

export default Events;