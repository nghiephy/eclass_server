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
                content: data.question,
                deadline: data.deadline,
                type: 'CH',
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
                title: data.question,
                guide: data.content,
                maxScore: data.maxScore,
                isBlock: false,
                typeExe: data.typeExe,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });
            const exerciseId = ExerciseRes.dataValues.id;

            if (data.typeExe === 'question_choice') {
                data.answerList = data.answerList.map((item) => {
                    return {
                        exerciseId: exerciseId,
                        content: item.content,
                        correct: item.correct,
                        createdAt: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedAt: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    };
                });

                const ansRes = await db.Answer.bulkCreate(data.answerList);
            }

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
            const exerciseData = await db.Post.findOne({
                where: {
                    id: postId,
                    type: 'CH',
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

let getAnswer = (userId, exerciseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const submitting = await db.Submitting.findOne({
                where: {
                    exerciseId: exerciseId,
                    userId: userId,
                },
                attributes: [
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
            reject(error);
        }
    });
};

let submitQuestion = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const updatedRows = await db.Post.update(
            //     {
            //         isCompleted: true,
            //     },
            //     {
            //         where: {
            //             id: data.postId,
            //         },
            //     },
            // );

            const submittingRes = await db.Submitting.create({
                userId: userId,
                exerciseId: data.exerciseId,
                isMarked: data.isMarked,
                answer: data.answerText,
                answerChoice: data.answerChoice,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });

            resolve(submittingRes);
        } catch (e) {
            reject(e);
        }
    });
};

let getChoices = (userId, exerciseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const choiceData = await db.Answer.findAll({
                where: {
                    exerciseId: exerciseId,
                },
                attributes: [['id', 'answerId'], 'exerciseId', 'createdAt', 'updatedAt', 'content', 'correct'],
                raw: true,
            });
            resolve(choiceData);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    create: create,
    getDetail: getDetail,
    getChoices: getChoices,
    getAnswer: getAnswer,
    submitQuestion: submitQuestion,
};
