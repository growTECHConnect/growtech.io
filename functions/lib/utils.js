"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
exports.validateAdminAuthorization = (req, res, next) => {
    const authorization = req.get('authorization');
    const token = authorization ? authorization.replace('Bearer ', '') : false;
    if (token) {
        admin
            .auth()
            .verifyIdToken(token)
            .then(({ uid }) => {
            return admin
                .database()
                .ref(`/access/${uid}`)
                .once('value')
                .then((snapshot) => snapshot.val())
                .then(({ role }) => {
                if (role === 'admin') {
                    return next();
                }
                res.status(403).json({ status: 'unauthorized: no admin access' });
            })
                .catch(() => {
                res.status(403).json({ status: 'unauthorized: no admin access' });
            });
        })
            .catch((error) => {
            console.info(error);
            res.status(403).json({ status: 'unauthorized: no access' });
        });
    }
    else {
        res.status(403).json({ status: 'unauthorized: no token' });
    }
};
//# sourceMappingURL=utils.js.map