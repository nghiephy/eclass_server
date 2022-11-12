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
                    userId: userId,
                },
                raw: true,
            });
            const submitId = submitting?.id;
            if (!submitId) {
                resolve([]);
                return;
            }
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

let checkIsCompleted = (userId, exerciseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const submitting = await db.Submitting.findOne({
                where: {
                    exerciseId: exerciseId,
                    userId: userId,
                },
                attributes: [
                    'userId',
                    'exerciseId',
                    'answer',
                    'answerChoice',
                    'createdAt',
                    'updatedAt',
                    [sequelize.col('Answer.id'), 'answerId'],
                    [sequelize.col('Answer.correct'), 'correct'],
                    [sequelize.col('Answer.content'), 'content'],
                ],
                include: [
                    {
                        model: db.Answer,
                        attributes: [],
                    },
                ],
                raw: true,
            });
            resolve(submitting);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

let markExercise = (userId, postId, submitId, score, comment) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resultSubmit = await db.Result_Submit.create({
                userId: userId,
                postId: postId,
                submitId: submitId,
                score: score,
                comment: comment,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });
            if (submitId) {
                const updateMarked = await db.Submitting.update(
                    {
                        isMarked: true,
                    },
                    {
                        where: {
                            id: submitId,
                        },
                    },
                );
            }

            resolve(resultSubmit);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

let updateMarkExercise = (userId, postId, score, comment) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resultSubmit = await db.Result_Submit.update(
                {
                    score: score,
                    comment: comment,
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    where: {
                        userId: userId,
                        postId: postId,
                    },
                },
            );

            resolve(resultSubmit);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

let getResultSubmit = (userId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const exerciseRes = await db.Exercise.findOne({
                where: {
                    postId: postId,
                },
                raw: true,
            });
            const exerciseId = exerciseRes.id;

            const submitting = await db.Submitting.findOne({
                where: {
                    exerciseId: exerciseId,
                    userId: userId,
                },
                attributes: [
                    ['id', 'submitId'],
                    'userId',
                    'answer',
                    'answerChoice',
                    'exerciseId',
                    'isMarked',
                    ['createdAt', 'submit_date'],
                    ['updatedAt', 'submit_update_date'],
                    [sequelize.col('Result_Submit.userId'), 'userSubmitId'],
                    [sequelize.col('Result_Submit.score'), 'score'],
                    [sequelize.col('Result_Submit.comment'), 'comment'],
                    [sequelize.col('Result_Submit.createdAt'), 'marked_date'],
                    [sequelize.col('Result_Submit.updatedAt'), 'marked_update_date'],
                ],
                include: [
                    {
                        model: db.Result_Submit,
                        attributes: [],
                    },
                ],
                raw: true,
            });

            resolve(submitting);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

let getMemberSubmit = (classId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const memData = await db.Authorization.findAll({
                where: {
                    class: classId,
                    role: 'HS',
                },
                attributes: [
                    ['createdAt', 'joinedDate'],
                    'updatedAt',
                    [sequelize.col('User.fullName'), 'fullName'],
                    [sequelize.col('User.id'), 'userId'],
                    [sequelize.col('User.avatar'), 'avatar'],
                    [sequelize.col('User.Result_Submits.submitId'), 'submitId'],
                    [sequelize.col('User.Result_Submits.score'), 'score'],
                    [sequelize.col('User.Result_Submits.comment'), 'comment'],
                    [sequelize.col('User.Result_Submits.postId'), 'postId'],
                    [sequelize.col('User.Result_Submits.createdAt'), 'submitedDate'],
                ],
                include: [
                    {
                        model: db.User,
                        attributes: [],
                        include: {
                            model: db.Result_Submit,
                            attributes: [],
                            where: {
                                postId: postId,
                            },
                            required: false,
                        },
                    },
                ],
                required: false,
                raw: true,
            });

            resolve(memData);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllNameExercise = (classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const nameExerciseList = await db.Post.findAll({
                where: {
                    class: classId,
                    isDelete: 0,
                    type: ['BT', 'CH'],
                },
                attributes: ['content', 'id', 'type', 'deadline'],
                raw: true,
            });

            resolve(nameExerciseList);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllScoreExercise = (classId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allScoreRes = await db.Post.findAll({
                where: {
                    class: classId,
                    isDelete: 0,
                    type: ['BT', 'CH'],
                },
                attributes: [
                    'content',
                    ['id', 'postId'],
                    'createdAt',
                    [sequelize.col('Result_Submits.userId'), 'userId'],
                    [sequelize.col('Result_Submits.score'), 'score'],
                    [sequelize.col('Result_Submits.comment'), 'comment'],
                    [sequelize.col('Result_Submits.submitId'), 'submitId'],
                    [sequelize.col('Result_Submits.User.fullName'), 'fullName'],
                    [sequelize.col('Result_Submits.User.id'), 'userId'],
                ],
                include: [
                    {
                        model: db.Result_Submit,
                        attributes: [],
                        include: [{ model: db.User, attributes: [] }],
                        where: {
                            userId: userId,
                        },
                        required: false,
                    },
                ],
                raw: true,
            });

            resolve(allScoreRes);
        } catch (e) {
            reject(e);
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
    checkIsCompleted: checkIsCompleted,
    getResultSubmit: getResultSubmit,
    getMemberSubmit: getMemberSubmit,
    getAllNameExercise: getAllNameExercise,
    getAllScoreExercise: getAllScoreExercise,
    updateMarkExercise: updateMarkExercise,
};
