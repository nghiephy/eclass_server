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
                typeExe: 'question_text',
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

module.exports = {
    create: create,
};
