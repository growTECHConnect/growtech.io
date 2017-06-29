const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const ref = admin.database().ref();

exports.initializeUser = functions.auth.user().onCreate((event) => {
    const user = event.data;
    const groupRef = ref.child('/groups');
    const groupKey = groupRef.push().key;

    const newGroup = ref.child(`groups/${groupKey}`).update({
        createdAt: new Date(),
    });

    const newAccount = ref.child(`/account/${user.uid}`).update({
        email: user.email,
        group: groupKey,
        role: 'user',
        createdAt: new Date(),
    });

    const newCompany = ref.child(`/companies/${groupKey}`).update({
        name: `My New Company`,
        createdAt: new Date(),
    });

    const newNews = ref.child(`/news/${groupKey}`).update(false);

    const newEvents = ref.child(`/events/${groupKey}`).update(false);

    return Promise.all([newGroup, newAccount, newCompany, newNews, newEvents]);
});