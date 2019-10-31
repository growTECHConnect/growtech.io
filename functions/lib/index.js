"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const yup = __importStar(require("yup"));
const v1_1 = __importDefault(require("uuid/v1"));
const utils_1 = require("./utils");
const env_1 = __importDefault(require("./env"));
const adminConfig = process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG) : { projectId: 'growtech-staging' };
const { serviceAccount } = env_1.default[adminConfig.projectId];
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${adminConfig.projectId}.firebaseio.com`,
});
const app = express_1.default();
const router = express_1.default.Router();
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://growtech.io'];
app.use(cors_1.default({
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (origin && whitelist.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error(`Not allowed by CORS ${origin}`));
    },
    credentials: true,
}));
const getAccounts = () => {
    return Promise.all([
        admin
            .database()
            .ref(`/account`)
            .once('value')
            .then((snapshot) => snapshot.val()),
        admin
            .database()
            .ref(`/access`)
            .once('value')
            .then((snapshot) => snapshot.val()),
        admin.auth().listUsers(),
    ]).then((results) => {
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
router.use('/admin', utils_1.validateAdminAuthorization);
router.get('/admin/accounts', (req, res) => {
    getAccounts()
        .then((users) => res.json(users))
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
    });
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
        .then((body) => {
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
            const response = {};
            if (error && error.code) {
                if (error.code === 'auth/email-already-exists' ||
                    error.code === 'auth/email-already-in-use' ||
                    error.code === 'auth/invalid-email') {
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
            .update(Object.assign(Object.assign({}, access), { updatedAt: new Date() })),
        admin
            .database()
            .ref(`/account/${uid}`)
            .update(Object.assign(Object.assign({}, account), { updatedAt: new Date() })),
        admin.auth().updateUser(uid, user),
    ])
        .then(() => getAccounts())
        .then((users) => res.json(users[uid]))
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
    });
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
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
    });
});
router.get('/', (req, res) => {
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
exports.api = functions.https.onRequest(app);
exports.createRequest = functions.https.onCall((data) => {
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
            .then((values) => {
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
            .ref(`/requests/${v1_1.default()}`)
            .set(values);
    })
        .catch((error) => {
        console.error(error);
        throw new functions.https.HttpsError(error.name, error.message);
    });
});
//# sourceMappingURL=index.js.map