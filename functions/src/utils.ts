import * as admin from 'firebase-admin';

export const validateAdminAuthorization = (req: any, res: any, next: any) => {
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
                console.error(error);
                res.status(403).json({ status: 'unauthorized: no access' });
            });
    } else {
        res.status(403).json({ status: 'unauthorized: no token' });
    }
};
