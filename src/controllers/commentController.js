import db from '../models/index.js';
import { QueryTypes } from 'sequelize';

import commentService from '../services/commentService';

let createComment = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    try {
        const commentRes = await commentService.createComment(userId, data);
        res.status(200).json({ message: 'success', data: commentRes, userId });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

let getAllComment = async (req, res) => {
    const userId = req.user.id;
    const classId = req.query.classId;
    const postId = req.query.postId;

    try {
        const allComment = await commentService.getAllComment(classId, postId);
        res.status(200).json({ message: 'success', allComment });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

module.exports = {
    createComment: createComment,
    getAllComment: getAllComment,
};
