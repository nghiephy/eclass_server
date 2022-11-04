import db from '../models/index';
import sequelize from 'sequelize';
import { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';
const moment = require('moment');

let create = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const postRes = await db.Post.create({
                userId: userId,
                class: data.classId,
                content: data.title,
                type: 'TL',
                topicId: data.topicId !== 0 ? data.topicId : null,
                isCompleted: 0,
                isDelete: 0,
                isHidden: 0,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });
            const postId = postRes.dataValues.id;
            const MaterialRes = await db.Material.create({
                postId: postId,
                title: data.title,
                guide: data.content,
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

let getDetail = (userId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const materialData = await db.Post.findOne({
                where: {
                    id: postId,
                    type: 'TL',
                    isDelete: 0,
                },
                attributes: [
                    ['id', 'postId'],
                    ['class', 'classId'],
                    'userId',
                    'createdAt',
                    'updatedAt',
                    'deadline',
                    'content',
                    'type',
                    'isCompleted',
                    [sequelize.col('Material.title'), 'title'],
                    [sequelize.col('Material.guide'), 'guide'],
                ],
                include: [
                    {
                        model: db.Material,
                        attributes: [],
                    },
                ],
                raw: true,
            });
            resolve(materialData);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    create: create,
    getDetail: getDetail,
};
