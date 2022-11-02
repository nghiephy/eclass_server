import db from '../models/index';
import sequelize from 'sequelize';

let createComment = (userId, data) => {
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
            const commentIntance = await db.Comment.create({
                userId: userId,
                classId: data.classId,
                postId: data.postId,
                content: data.content,
                isDelete: false,
                createdAt: `${timestamp}`,
                updatedAt: `${timestamp}`,
            });

            resolve(commentIntance);
        } catch (error) {
            reject(error);
        }
    });
};

let getAllComment = (classId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allComment = await db.Comment.findAll({
                where: {
                    classId: classId,
                    postId: postId,
                    isDelete: false,
                },
                order: [['createdAt', 'DESC']],
                attributes: [
                    'classId',
                    'postId',
                    'content',
                    ['id', 'commentId'],
                    'reply',
                    'userId',
                    [sequelize.col('User.fullName'), 'fullName'],
                    [sequelize.col('User.avatar'), 'avatar'],
                    [sequelize.fn('DATE_FORMAT', sequelize.col('Comment.createdAt'), '%d-%m-%Y %H:%i:%s'), 'createdAt'],
                    [sequelize.fn('DATE_FORMAT', sequelize.col('Comment.updatedAt'), '%d-%m-%Y %H:%i:%s'), 'updatedAt'],
                ],
                include: [
                    {
                        model: db.User,
                        attributes: [],
                    },
                ],
            });

            resolve(allComment);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createComment: createComment,
    getAllComment: getAllComment,
};
