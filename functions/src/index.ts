import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import yup from 'yup';
import { validateAdminAuthorization } from './utils';

const projectId = process.env.REACT_APP_FIREBASE_PROJECTID ? process.env.REACT_APP_FIREBASE_PROJECTID : undefined;
const serviceAccount = projectId ? require(`../../${projectId}.json`) : undefined;

if (projectId) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${projectId}.firebaseio.com`,
    });
} else {
    admin.initializeApp();
}

const app = express();
const router = express.Router();
const whitelist = ['http://localhost:3000', 'http://localhost:5000'];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) {
                return callback(null, true);
            }

            if (origin && whitelist.indexOf(origin) !== -1) {
                return callback(null, true);
            }

            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    })
);

const getAccounts = () => {
    return Promise.all([
        admin
            .database()
            .ref(`/account`)
            .once('value')
            .then((snapshot: any) => snapshot.val()),
        admin
            .database()
            .ref(`/access`)
            .once('value')
            .then((snapshot) => snapshot.val()),
        admin.auth().listUsers(),
    ]).then((results) => {
        const account = results[0];
        const access = results[1];
        const users: any = {};

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

router.use('/admin', validateAdminAuthorization);

router.get('/admin/accounts', (req, res) => {
    getAccounts()
        .then((users) => res.json(users))
        .catch((error) => res.status(500).json({ error }));
});

router.post('/admin/accounts', (req, res) => {
    const schema = yup.object().shape({
        company: yup.string().required(),
        email: yup
            .string()
            .email()
            .required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        role: yup.string().oneOf(['admin', 'edit']),
    });

    return schema
        .validate(req.body)
        .then((body: any) => {
            const { company, email, firstName, lastName, role = 'edit' } = body;

            return admin
                .auth()
                .createUser({ email })
                .then((user) => {
                    const { uid } = user;
                    const account = admin
                        .database()
                        .ref(`/account/${uid}`)
                        .update({
                            createdAt: new Date(),
                            email,
                            firstName,
                            lastName,
                        });
                    const access = admin
                        .database()
                        .ref(`/access/${uid}`)
                        .update({
                            createdAt: new Date(),
                            company,
                            role,
                        });

                    return Promise.all([account, access]);
                })
                .then(() => getAccounts())
                .then((users) => res.json(users))
                .catch((error) => {
                    const response: any = {};

                    if (error && error.code) {
                        if (
                            error.code === 'auth/email-already-exists' ||
                            error.code === 'auth/email-already-in-use' ||
                            error.code === 'auth/invalid-email'
                        ) {
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
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
});

router.put('/admin/accounts/:uid', (req, res) => {
    const { uid } = req.params;
    const { access = {}, account = {}, user = {} } = req.body;

    Promise.all([
        admin
            .database()
            .ref(`/access/${uid}`)
            .update({
                ...access,
                updatedAt: new Date(),
            }),
        admin
            .database()
            .ref(`/account/${uid}`)
            .update({
                ...account,
                updatedAt: new Date(),
            }),
        admin.auth().updateUser(uid, user),
    ])
        .then(() => getAccounts())
        .then((users) => res.json(users[uid]))
        .catch((error) => res.status(500).json({ error }));
});

router.post('/signup', (req, res) => {
    const { email, uid } = req.body;
    const ref = admin.database().ref();
    const companyRef = ref.child('/companies');
    const companyKey = companyRef.push().key;

    const company = ref.child(`/companies/${companyKey}`).update({
        createdAt: new Date(),
        active: false,
        companyType: 'EDUCATIONAL',
        employeeSize: '0',
        employmentType: 'FULL_TIME',
        hiring: false,
        industryType: 'ACCOUNTING',
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

router.put('/admin/companies/:uid', (req, res) => {
    const { company } = req.body;
    const { uid } = req.params;
    const ref = admin.database().ref();

    return ref
        .child(`/companies/${uid}`)
        .update(Object.assign({}, company, { updatedAt: new Date() }))
        .then(() => res.json({ success: true }))
        .catch((error) => res.status(500).json({ error }));
});

router.get('/', (req, res) => {
    return admin
        .database()
        .ref('/config')
        .once('value')
        .then((snapshot) => {
            const { database } = snapshot.val();

            res.json({ status: 'okay', database, projectId });
        })
        .catch((error) => res.status(500).json({ error }));
});

app.use('/api', router);

export const api = functions.https.onRequest(app);
