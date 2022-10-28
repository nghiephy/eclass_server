import db from '../models/index';
import sequelize from 'sequelize';
import { QueryTypes } from 'sequelize';
const moment = require('moment');

let createPost = (userId, data) => {
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

            const postIntance = await db.Post.create({
                userId: userId,
                class: parseInt(data.classId),
                content: data.content,
                type: data.type,
                createdAt: `${timestamp}`,
                updatedAt: `${timestamp}`,
            });
            const postId = postIntance.dataValues.id;
            data.file_list = data.file_list.map((item) => {
                return { postId: postId, createdAt: `${timestamp}`, updatedAt: `${timestamp}`, ...item };
            });
            data.link_list = data.link_list.map((item) => {
                return { postId: postId, createdAt: `${timestamp}`, updatedAt: `${timestamp}`, title: '', url: item };
            });

            const linkRes = await db.Link.bulkCreate(data.link_list);
            const fileRes = await db.File.bulkCreate(data.file_list);

            resolve(postIntance);
        } catch (error) {
            reject(error);
        }
    });
};

let getAnnouPost = (userId, classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const postData = await db.Post.findAll({
                where: {
                    class: classId,
                },
                attributes: [
                    ['id', 'postId'],
                    [sequelize.fn('DATE_FORMAT', sequelize.col('Post.createdAt'), '%d-%m-%Y %H:%i:%s'), 'createdAt'],
                    [sequelize.fn('DATE_FORMAT', sequelize.col('Post.updatedAt'), '%d-%m-%Y %H:%i:%s'), 'updatedAt'],
                    ['class', 'classId'],
                    'content',
                    'isHidden',
                    'isDelete',
                    [sequelize.col('User.fullName'), 'fullName'],
                    [sequelize.col('User.id'), 'userId'],
                    [sequelize.col('User.avatar'), 'avatar'],
                ],
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: db.User,
                        attributes: [],
                    },
                ],
                raw: true,
            });
            resolve(postData);
        } catch (error) {
            reject(error);
        }
    });
};

let getAttachment = (userId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const attachment = {};
            const links = await db.Link.findAll({
                where: {
                    postId: postId,
                },
                attributes: [['id', 'linkId'], 'title', 'url', 'image'],
                raw: true,
            });
            const files = await db.File.findAll({
                where: {
                    postId: postId,
                },
                attributes: [['id', 'fileId'], 'name', 'url', 'type'],
                raw: true,
            });
            attachment.links = links;
            attachment.files = files;
            resolve(attachment);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createPost: createPost,
    getAnnouPost: getAnnouPost,
    getAttachment: getAttachment,
};
