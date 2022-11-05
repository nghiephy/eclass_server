import db from '../models/index.js';
import { QueryTypes } from 'sequelize';

import questionService from '../services/questionService';

let getQuestion = async (req, res) => {
    const userId = req.user.id;
    let classId = parseInt(req.params.classid);
    let postId = parseInt(req.params.postid);

    try {
        const questionRes = await questionService.getDetail(userId, postId);
        let choiceRes = null;
        if (questionRes.typeExe === 'question_choice') {
            choiceRes = await questionService.getChoices(userId, questionRes.exerciseId);
        }
        res.status(200).json({ message: 'success', question: questionRes, answerList: choiceRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

module.exports = {
    getQuestion: getQuestion,
};
