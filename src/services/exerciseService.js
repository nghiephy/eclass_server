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
                    // [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d-%m-%Y %H:%i:%s'), 'createdAt'],
                    // [sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), '%d-%m-%Y %H:%i:%s'), 'updatedAt'],
                    // [sequelize.fn('DATE_FORMAT', sequelize.col('deadline'), '%d-%m-%Y %H:%i:%s'), 'deadline'],
                    'createdAt',
                    'updatedAt',
                    'deadline',
                    'content',
                    'isDelete',
                    'isHidden',
                    'type',
                    'isCompleted',
                    'topicId',
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

let getDetail = (userId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const exerciseData = await db.Post.findOne({
                where: {
                    id: postId,
                    type: 'BT',
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
                    'topicId',
                    [sequelize.col('Exercise.id'), 'exerciseId'],
                    [sequelize.col('Exercise.title'), 'title'],
                    [sequelize.col('Exercise.guide'), 'guide'],
                    [sequelize.col('Exercise.maxScore'), 'maxScore'],
                    [sequelize.col('Exercise.isBlock'), 'isBlock'],
                    [sequelize.col('Exercise.typeExe'), 'typeExe'],
                ],
                include: [
                    {
                        model: db.Exercise,
                        attributes: [],
                    },
                ],
                raw: true,
            });
            resolve(exerciseData);
        } catch (error) {
            reject(error);
        }
    });
};

let getViaTopic = (userId, classId, topicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const exerciseData = await db.Post.findAll({
                where: {
                    class: classId,
                    [Op.not]: [{ type: ['TB'] }],
                    isDelete: 0,
                    topicId: topicId,
                },
                attributes: [
                    ['id', 'postId'],
                    ['class', 'classId'],
                    'userId',
                    // [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d-%m-%Y %H:%i:%s'), 'createdAt'],
                    // [sequelize.fn('DATE_FORMAT', sequelize.col('updatedAt'), '%d-%m-%Y %H:%i:%s'), 'updatedAt'],
                    // [sequelize.fn('DATE_FORMAT', sequelize.col('deadline'), '%d-%m-%Y %H:%i:%s'), 'deadline'],
                    'createdAt',
                    'updatedAt',
                    'deadline',
                    'content',
                    'isDelete',
                    'isHidden',
                    'type',
                    'isCompleted',
                    'topicId',
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

let updateAssignment = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedRows = await db.Post.update(
                {
                    content: data.title,
                    deadline: data.deadline,
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    where: {
                        id: data.postId,
                    },
                },
            );

            const updatedExercise = await db.Exercise.update(
                {
                    guide: data.content,
                    title: data.title,
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    where: {
                        postId: data.postId,
                    },
                },
            );

            if (data.file_list.length > 0) {
                data.file_list = data.file_list.map((item) => {
                    return {
                        postId: data.postId,
                        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                        ...item,
                    };
                });
                const fileRes = await db.File.bulkCreate(data.file_list);
            }
            if (data.link_list.length > 0) {
                data.link_list = data.link_list.map((item) => {
                    return {
                        postId: data.postId,
                        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                        title: '',
                        url: item,
                    };
                });
                const linkRes = await db.Link.bulkCreate(data.link_list);
            }

            if (data.filesDeleted.length > 0) {
                data.filesDeleted = data.filesDeleted.map((fileId) => {
                    return parseInt(fileId);
                });
                const deletedRows = await db.File.destroy({
                    where: { id: data.filesDeleted },
                });
            }
            if (data.linksDeleted.length > 0) {
                data.linksDeleted = data.linksDeleted.map((linkId) => {
                    return parseInt(linkId);
                });
                const deletedRows = await db.Link.destroy({
                    where: { id: data.linksDeleted },
                });
            }
            resolve(updatedRows);
        } catch (e) {
            reject(e);
        }
    });
};

let submitAssignment = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedRows = await db.Post.update(
                {
                    isCompleted: true,
                },
                {
                    where: {
                        id: data.postId,
                    },
                },
            );

            const submittingRes = await db.Submitting.create({
                userId: userId,
                exerciseId: data.exerciseId,
                isMarked: false,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });
            const submitId = submittingRes.dataValues.id;

            if (data.file_list.length > 0) {
                data.file_list = data.file_list.map((item) => {
                    return {
                        submitId: submitId,
                        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                        ...item,
                    };
                });
                const submitFileRes = await db.Submit_File.bulkCreate(data.file_list);
            }
            resolve(submittingRes);
        } catch (e) {
            reject(e);
        }
    });
};

let getSubmitFiles = (userId, exerciseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const submitting = await db.Submitting.findOne({
                where: {
                    exerciseId: exerciseId,
                },
                raw: true,
            });
            console.log('submitId ----------: ', submitting);
            const submitId = submitting.id;

            const files = await db.Submit_File.findAll({
                where: {
                    submitId: submitId,
                },
                attributes: [['id', 'submitFileId'], 'name', 'url', 'type'],
                raw: true,
            });
            resolve(files);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

let markExercise = (userId, submitId, score, comment) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resultSubmit = await db.Result_Submit.create({
                userId: userId,
                submitId: submitId,
                score: score,
                comment: comment,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });

            resolve(resultSubmit);
        } catch (error) {
            console.log(error);
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
                deadline: data.deadline,
                type: 'BT',
                topicId: data.topicId !== 0 ? data.topicId : null,
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
                maxScore: data.maxScore,
                isBlock: false,
                typeExe: 'assignment',
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
    getViaTopic: getViaTopic,
    getDetail: getDetail,
    updateAssignment: updateAssignment,
    submitAssignment: submitAssignment,
    getSubmitFiles: getSubmitFiles,
    markExercise: markExercise,
};
