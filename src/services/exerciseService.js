import db from '../models/index';
import sequelize from 'sequelize';
import { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';
const moment = require('moment');

let getAll = (userId, classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const exerciseData = await db.Post.findAll({
                where: {
                    class: classId,
                    [Op.not]: [{ type: ['TB'] }],
                    isDelete: 0,
                },
                attributes: [
                    ['id', 'postId'],
                    ['class', 'classId'],
                    'userId',
                    [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d-%m-%Y %H:%i:%s'), 'createdAt'],
                    [sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), '%d-%m-%Y %H:%i:%s'), 'updatedAt'],
                    [sequelize.fn('DATE_FORMAT', sequelize.col('deadline'), '%d-%m-%Y %H:%i:%s'), 'deadline'],
                    'content',
                    'isDelete',
                    'isHidden',
                    'type',
                    'isCompleted',
                ],
                order: [['createdAt', 'DESC']],
                raw: true,
            });
            resolve(exerciseData);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAll: getAll,
};
