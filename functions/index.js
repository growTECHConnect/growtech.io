const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const ref = admin.database().ref();

exports.initializeUser = functions.auth.user().onCreate((event) => {
    const user = event.data;
    const companyRef = ref.child('/companies');
    const companyKey = companyRef.push().key;

    const company = ref.child(`/companies/${companyKey}`).update({
        createdAt: new Date(),
    });

    const account = ref.child(`/account/${user.uid}`).update({
        email: user.email,
        createdAt: new Date(),
    });

    const access = ref.child(`/access/${user.uid}`).update({
        role: 'edit',
        company: companyKey,
        createdAt: new Date(),
    });

    return Promise.all([company, account]);
});