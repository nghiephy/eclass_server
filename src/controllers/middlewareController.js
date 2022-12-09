import jwt from 'jsonwebtoken';

import authService from '../services/authService';

const middlewareController = {
    // verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token;

        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json('Token is not valid!');
                    return;
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json('You are not authenticated!');
        }
    },

    verifyTeacher: async (req, res, next) => {
        const classId = req.params.classid;
        const userId = req.user.id;

        try {
            const isTeacher = await authService.verifyRoleUser(userId, classId, 'GV');
            if (!isTeacher) {
                res.status(403).json({ message: 'You are not allow to access!', code: 'unauthorized' });
                return;
            }
            next();
        } catch (error) {
            console.log(error);
        }
    },

    verifyStudent: async (req, res, next) => {
        const classId = req.params.classid || req.params.id;
        const userId = req.user.id;

        try {
            const isStudent = await authService.verifyRoleUser(userId, classId, 'HS');
            if (!isStudent) {
                res.status(403).json({ message: 'You are not allow to access!', code: 'unauthorized' });
                return;
            }
            next();
        } catch (error) {
            console.log(error);
        }
    },

    verifyRole: async (req, res, next) => {
        const classId = req.params.classid || req.params.classId || req.params.id;
        const role = req.query.role;
        const userId = req.user.id;

        try {
            const isStudent = await authService.verifyRoleUser(userId, classId, role);
            if (!isStudent) {
                res.status(403).json({ message: 'You are not allow to access!', code: 'unauthorized' });
                return;
            }
            next();
        } catch (error) {
            console.log(error);
        }
    },

    verifyMemberClass: async (req, res, next) => {
        const classId = req.params.classid || req.params.id;
        const userId = req.user.id;

        try {
            const isStudent = await authService.verifyMemberClass(userId, classId);
            if (!isStudent) {
                res.status(403).json({ message: 'You are not allow to access!', code: 'unauthorized' });
                return;
            }
            next();
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = middlewareController;
