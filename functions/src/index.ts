import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Express from 'express';
import Cors from 'cors';
import * as yup from 'yup';
import uuid from 'uuid/v1';
import { validateAdminAuthorization } from './utils';
import env from './env';

const adminConfig: any = process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG) : { projectId: 'growtech-staging' };
const { serviceAccount } = env[adminConfig.projectId];

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${adminConfig.projectId}.firebaseio.com`,
});

const app = Express();
const router = Express.Router();
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://growtech.io'];

app.use(
    Cors({
        origin: function(origin: any, callback: any) {
            if (!origin) {
                return callback(null, true);
            }

            if (origin && whitelist.indexOf(origin) !== -1) {
                return callback(null, true);
            }

            return callback(new Error(`Not allowed by CORS ${origin}`));
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

router.get('/admin/accounts', (req: any, res: any) => {
    getAccounts()
        .then((users) => res.json(users))
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error });
        });
});

router.post('/admin/accounts', (req: any, res: any) => {
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
        .catch((error: Error) => {
            return res.status(500).json({ error });
        });
});

router.put('/admin/accounts/:uid', (req: any, res: any) => {
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
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error });
        });
});

router.post('/signup', (req: any, res: any) => {
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

router.put('/admin/companies/:uid', (req: any, res: any) => {
    const { company } = req.body;
    const { uid } = req.params;
    const ref = admin.database().ref();

    return ref
        .child(`/companies/${uid}`)
        .update(Object.assign({}, company, { updatedAt: new Date() }))
        .then(() => res.json({ success: true }))
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error });
        });
});

router.get('/', (req: any, res: any) => {
    return admin
        .database()
        .ref('/config')
        .once('value')
        .then((snapshot) => {
            const { database } = snapshot.val();

            res.json({ status: 'okay', database, projectId: adminConfig.projectId });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error });
        });
});

app.use('/api', router);

export const api = functions.https.onRequest(app);

const verifyAdmin = (context: functions.https.CallableContext) => {
    if (context && context.auth) {
        return admin
            .database()
            .ref(`/access/${context.auth.uid}`)
            .once('value')
            .then((snapshot) => snapshot.val())
            .then(({ role }) => {
                if (role !== 'admin') {
                    throw new functions.https.HttpsError('permission-denied', 'unauthorized: no admin access');
                }
            });
    } else {
        throw new functions.https.HttpsError('permission-denied', 'unauthorized: no admin access');
    }
};

const catchError = (error: functions.https.HttpsError) => {
    console.error(error);

    if (error.code && error.message) {
        throw new functions.https.HttpsError(error.code, error.message);
    }

    throw new functions.https.HttpsError('unknown', 'unknown: check logs');
};

exports = {
    createRequest: functions.https.onCall((data) => {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup
                .string()
                .email()
                .required(),
            companyName: yup.string().required(),
        });

        return new Promise((resolve, reject) => {
            return schema
                .validate(data, { stripUnknown: true })
                .then((values: any) => {
                    const { email } = values;

                    return admin
                        .auth()
                        .getUserByEmail(email)
                        .then(() => {
                            reject({ name: 'already-exists', message: 'Sorry, this email is already in use.' });
                        })
                        .catch(() => {
                            resolve(values);
                        });
                })
                .catch(() => {
                    reject({ name: 'invalid-argument', message: 'invalid data object' });
                });
        })
            .then((values) => {
                return admin
                    .database()
                    .ref(`/requests/${uuid()}`)
                    .set(values);
            })
            .catch((error) => {
                console.error(error);
                throw new functions.https.HttpsError(error.name, error.message);
            });
    }),
    admin: {
        readRequests: functions.https.onCall((data, context) => {
            return Promise.resolve()
                .then(() => verifyAdmin(context))
                .then(() => {
                    return admin
                        .database()
                        .ref(`/requests`)
                        .once('value')
                        .then((snapshot) => snapshot.val());
                })
                .catch((error) => catchError(error));
        }),
        deleteRequests: functions.https.onCall((data, context) => {
            const schema = yup.object().shape({
                requestId: yup.string().required(),
            });

            return schema
                .validate(data, { stripUnknown: true })
                .then(({ requestId }) => {
                    return Promise.resolve()
                        .then(() => verifyAdmin(context))
                        .then(() => {
                            return admin
                                .database()
                                .ref(`/requests/${requestId}`)
                                .remove();
                        });
                })
                .catch((error) => catchError(error));
        }),
        createAccount: functions.https.onCall((data, context) => {
            const schema = yup.object().shape({
                companyId: yup.string().required(),
                requestId: yup.string().required(),
            });

            return schema
                .validate(data, { stripUnknown: true })
                .then(({ companyId, requestId }) => {
                    return Promise.resolve().then(() => verifyAdmin(context));
                    // .then(() => {
                    //     return admin
                    //         .database()
                    //         .ref(`/requests/${requestId}`)
                    //         .remove();
                    // });
                })
                .catch((error) => catchError(error));
        }),
    },
};
