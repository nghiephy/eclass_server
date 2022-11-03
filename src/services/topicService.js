import db from '../models/index';
import sequelize from 'sequelize';
import { QueryTypes } from 'sequelize';
const moment = require('moment');

let getTopics = (userId, classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const topicData = await db.Topic.findAll({
                where: {
                    classId: classId,
                },
                attributes: [
                    ['id', 'topicId'],
                    [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d-%m-%Y %H:%i:%s'), 'createdAt'],
                    [sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), '%d-%m-%Y %H:%i:%s'), 'updatedAt'],
                    'classId',
                    'name',
                ],
                raw: true,
            });
            resolve(topicData);
        } catch (error) {
            reject(error);
        }
    });
};

let createTopic = (userId, classId, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let date_ob = new Date();
            let date = ('0' + date_ob.getDate()).slice(-2);
            let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();

            const timestamp = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;

            const topicRes = await db.Topic.create({
                classId: classId,
                name: name,
                createdAt: `${timestamp}`,
                updatedAt: `${timestamp}`,
            });
            resolve(topicRes);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getTopics: getTopics,
    createTopic: createTopic,
};
