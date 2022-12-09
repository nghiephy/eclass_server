import db from '../models/index';
import sequelize from 'sequelize';
import { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';
const moment = require('moment');

let verifyRoleUser = (userId, classId, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.Authorization.findOne({
                where: {
                    userId: userId,
                    class: classId,
                    role: role,
                },
                attributes: { exclude: ['id'] },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

let verifyMemberClass = (userId, classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.Authorization.findOne({
                where: {
                    userId: userId,
                    class: classId,
                },
                attributes: { exclude: ['id'] },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    verifyRoleUser: verifyRoleUser,
    verifyMemberClass: verifyMemberClass,
};
