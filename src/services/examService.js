import db from '../models/index';
import sequelize from 'sequelize';
import { QueryTypes } from 'sequelize';
const moment = require('moment');

let createExam = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const postIntance = await db.Post.create({
                userId: userId,
                class: parseInt(data.classId),
                content: data.title,
                type: 'KT',
                isDelete: 0,
                isHidden: 0,
                isCompleted: 0,
                deadline: data.time,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });
            const postId = postIntance.dataValues.id;
            const finishedAt = moment(data.time).add(parseInt(data.duration), 'minutes');

            const examIntance = await db.Exam.create({
                postId: postId,
                title: data.title,
                guide: data.guide,
                password: data.passwordExam,
                maxScore: parseInt(data.totalScore),
                totalQuestion: data.questionList.length,
                isBlock: 0,
                requirePass: 1,
                startedAt: data.time,
                finishedAt: finishedAt,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });
            const examId = examIntance.dataValues.id;

            for (let i = 0; i < data.questionList.length; i++) {
                const question = data.questionList[i];
                const questionRes = await db.Exam_Question.create({
                    examId: examId,
                    question: question.questionName,
                    active: 1,
                    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                });
                const questionId = questionRes.dataValues.id;
                const answerList = question.answerList.map((answer) => {
                    return {
                        examId: examId,
                        exquesId: questionId,
                        content: answer.content,
                        correct: answer.correct,
                        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    };
                });

                const answerListRes = await db.Exam_Answer.bulkCreate(answerList);
            }

            resolve(postIntance);
        } catch (error) {
            reject(error);
        }
    });
};

let getAllExam = (userId, classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allExamRes = await db.Post.findAll({
                where: {
                    class: classId,
                    type: 'KT',
                    isDelete: false,
                },
                attributes: [
                    'userId',
                    ['class', 'classId'],
                    'content',
                    'isHidden',
                    'deadline',
                    'createdAt',
                    'updatedAt',
                    [sequelize.col('Exam.id'), 'examId'],
                    [sequelize.col('Exam.postId'), 'postId'],
                    [sequelize.col('Exam.title'), 'title'],
                    [sequelize.col('Exam.guide'), 'guide'],
                    [sequelize.col('Exam.maxScore'), 'maxScore'],
                    [sequelize.col('Exam.totalQuestion'), 'totalQuestion'],
                    [sequelize.col('Exam.isBlock'), 'isBlock'],
                    [sequelize.col('Exam.requirePass'), 'requirePass'],
                    [sequelize.col('Exam.startedAt'), 'startedAt'],
                    [sequelize.col('Exam.finishedAt'), 'finishedAt'],
                ],
                include: [
                    {
                        model: db.Exam,
                        attributes: [],
                    },
                ],
                raw: true,
            });

            resolve(allExamRes);
        } catch (error) {
            reject(error);
        }
    });
};

let deleteExam = (userId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedRows = await db.Post.update(
                {
                    isDelete: true,
                },
                {
                    where: {
                        id: postId,
                    },
                },
            );

            resolve(updatedRows);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createExam: createExam,
    getAllExam: getAllExam,
    deleteExam: deleteExam,
};
