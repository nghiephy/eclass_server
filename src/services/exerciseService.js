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

let create = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const postRes = await db.Post.create({
                userId: userId,
                class: data.classId,
                content: data.title,
                type: 'BT',
                isCompleted: 0,
                isDelete: 0,
                isHidden: 0,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });
            const postId = postRes.dataValues.id;
            const ExerciseRes = await db.Exercise.create({
                postId: postId,
                title: data.title,
                guide: data.content,
                topicId: data.topicId !== 0 ? data.topicId : null,
                maxScore: data.maxScore,
                isBlock: false,
                typeExe: 'text',
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });

            data.file_list = data.file_list.map((item) => {
                return {
                    postId: postId,
                    createdAt: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedAt: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    ...item,
                };
            });
            data.link_list = data.link_list.map((item) => {
                return {
                    postId: postId,
                    createdAt: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedAt: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    title: '',
                    url: item,
                };
            });

            const linkRes = await db.Link.bulkCreate(data.link_list);
            const fileRes = await db.File.bulkCreate(data.file_list);

            resolve(postRes);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAll: getAll,
    create: create,
};