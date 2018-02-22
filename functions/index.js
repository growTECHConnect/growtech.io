const functions = require('firebase-functions');
const fbAdmin = require('firebase-admin');
const express = require('express');
const validate = require('validate.js');
const { validateAdminAuthorization } = require('./utils');
const app = express();
const api = express();
fbAdmin.initializeApp(functions.config().firebase);
const getAccounts = () => {
    return Promise.all([
        fbAdmin.database().ref(`/account`).once('value').then((snapshot) => snapshot.val()),
        fbAdmin.database().ref(`/access`).once('value').then((snapshot) => snapshot.val()),
        fbAdmin.auth().listUsers()
    ])
        .then((results) => {
        const account = results[0];
        const access = results[1];
        const users = {};
        results[2].users.forEach((user) => {
            const role = access[user.uid] ? access[user.uid].role : null;
            const company = access[user.uid] ? access[user.uid].company : null;
            const firstName = account[user.uid] ? account[user.uid].firstName : null;
            const lastName = account[user.uid] ? account[user.uid].lastName : null;
            users[user.uid] = {
                disabled: user.disabled,
                email: user.email,
                uid: user.uid,
                company,
                firstName,
                lastName,
                role,
            };
        });
        return users;
    });
};
app.use('/admin', validateAdminAuthorization);
app.get('/admin/accounts', (req, res) => {
    getAccounts()
        .then((users) => res.json(users))
        .catch((error) => res.status(500).json({ error }));
});
app.post('/admin/accounts', (req, res) => {
    const { company, email, firstName, lastName, role = 'edit' } = req.body;
    const constraints = {
        company: {
            presence: { allowEmpty: false }
        },
        email: {
            email: true,
            presence: true,
        },
        firstName: {
            presence: { allowEmpty: false }
        },
        lastName: {
            presence: { allowEmpty: false }
        },
        role: {
            inclusion: ['admin', 'edit'],
        },
    };
    const error = validate(req.body, constraints);
    if (error) {
        Object.keys(error).forEach((key) => {
            error[key] = error[key][0];
        });
        return res.status(500).json({ error });
    }
    fbAdmin.auth().createUser({ email })
        .then((user) => {
        const { uid } = user;
        const account = fbAdmin.database().ref(`/account/${uid}`).update({
            createdAt: new Date(),
            email,
            firstName,
            lastName,
        });
        const access = fbAdmin.database().ref(`/access/${uid}`).update({
            createdAt: new Date(),
            company,
            role,
        });
        return Promise.all([account, access]);
    })
        .then(() => getAccounts())
        .then((users) => res.json(users))
        .catch((error) => {
        const response = {};
        if (error && error.code) {
            if (error.code === 'auth/email-already-exists' || error.code === 'auth/email-already-in-use' || error.code === 'auth/invalid-email') {
                response['email'] = error.message;
            }
            if (error.code === 'auth/weak-password') {
                response['password'] = error.message;
            }
            if (error.code === 'auth/operation-not-allowed') {
                response['global'] = error.message;
            }
        }
        res.status(500).json({ error: response, errors: error });
    });
});
app.put('/admin/accounts/:uid', (req, res) => {
    const { uid } = req.params;
    const { access = {}, account = {}, user = {} } = req.body;
    Promise.all([
        fbAdmin.database().ref(`/access/${uid}`).update(Object.assign({}, access, { updatedAt: new Date() })),
        fbAdmin.database().ref(`/account/${uid}`).update(Object.assign({}, account, { updatedAt: new Date() })),
        fbAdmin.auth().updateUser(uid, user),
    ])
        .then(() => getAccounts())
        .then((users) => res.json(users[uid]))
        .catch((error) => res.status(500).json({ error }));
});
app.post('/signup', (req, res) => {
    const { email, uid } = req.body;
    const ref = fbAdmin.database().ref();
    const companyRef = ref.child('/companies');
    const companyKey = companyRef.push().key;
    const company = ref.child(`/companies/${companyKey}`).update({
        createdAt: new Date(),
        active: false,
        hiring: false,
        employmentType: 'FULL_TIME',
    });
    const account = ref.child(`/account/${uid}`).update({
        createdAt: new Date(),
        email,
    });
    const access = ref.child(`/access/${uid}`).update({
        role: 'edit',
        company: companyKey,
        createdAt: new Date(),
    });
    return Promise.all([company, account, access])
        .then(() => {
        res.json({ success: true });
    })
        .catch((error) => res.status(500).json({ error }));
});
api.use('/api', app);
exports.api = functions.https.onRequest(api);
//# sourceMappingURL=index.js.map