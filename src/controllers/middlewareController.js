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
                res.status(403).json('You are not allow to access!');
                return;
            }
            next();
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = middlewareController;
