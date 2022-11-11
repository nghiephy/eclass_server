import db from '../models/index.js';
import { QueryTypes } from 'sequelize';

import questionService from '../services/questionService';
import exerciseService from '../services/exerciseService';

let getQuestion = async (req, res) => {
    let userId = req.user.id;
    let classId = parseInt(req.params.classid);
    let postId = parseInt(req.params.postid);
    let checkUserId = userId;

    if (req.query.userId) {
        checkUserId = parseInt(req.query.userId);
    }

    try {
        const questionRes = await questionService.getDetail(userId, postId);
        const exerciseId = questionRes.exerciseId;
        let choiceRes = null;

        const checkCompletedRes = await exerciseService.checkIsCompleted(checkUserId, exerciseId);
        if (questionRes.typeExe === 'question_choice') {
            choiceRes = await questionService.getChoices(checkUserId, questionRes.exerciseId);
        }
        res.status(200).json({
            message: 'success',
            question: questionRes,
            answerList: choiceRes,
            checkCompletedRes: checkCompletedRes,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let getAnswer = async (req, res) => {
    const userId = req.user.id;
    let exerciseId = parseInt(req.params.exerciseId);
    let checkUserId = userId;

    if (req.query.userId) {
        checkUserId = parseInt(req.query.userId);
    }

    try {
        const answerRes = await questionService.getAnswer(checkUserId, exerciseId);
        res.status(200).json({ message: 'success', answerRes: answerRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

let submitQuestion = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const dataSubmit = {};

    dataSubmit.exerciseId = parseInt(data.exerciseId);
    dataSubmit.postId = parseInt(data.postId);
    dataSubmit.typeExe = data.typeExe;

    if (data.typeExe === 'question_choice') {
        dataSubmit.answerChoice = data.answerChoice;
        dataSubmit.answerText = null;
        dataSubmit.isMarked = true;
    } else {
        dataSubmit.isMarked = false;
        dataSubmit.answerText = data.answerText;
        dataSubmit.answerChoice = null;
    }

    console.log(dataSubmit);

    try {
        const response = await questionService.submitQuestion(userId, dataSubmit);
        const submitId = response.dataValues.id;
        const submitRes = await questionService.getDetail(userId, dataSubmit.postId);
        let resultSubmitChoice = '';
        console.log(submitId);
        if (data.typeExe === 'question_choice') {
            const answer = await questionService.getAnswer(userId, dataSubmit.exerciseId);
            let score = parseInt(answer.correct) === 1 ? 100 : 0;
            const comment = '';

            resultSubmitChoice = await exerciseService.markExercise(
                userId,
                dataSubmit.postId,
                submitId,
                score,
                comment,
            );
        }

        res.status(200).json({
            message: 'success',
            submitRes: submitRes,
            resultSubmit: resultSubmitChoice,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

module.exports = {
    getQuestion: getQuestion,
    getAnswer: getAnswer,
    submitQuestion: submitQuestion,
};
