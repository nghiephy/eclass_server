import db from '../models/index.js';
import { QueryTypes } from 'sequelize';
import jwt from 'jsonwebtoken';
const fs = require('fs');
const path = require('path');

import examService from '../services/examService';

let createExam = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    console.log(data);

    try {
        const dataRes = await examService.createExam(userId, data);

        res.status(200).json({ message: 'success', data: dataRes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

let getAllExam = async (req, res) => {
    const userId = req.user.id;
    const classId = req.params.classId;

    try {
        const allExamRes = await examService.getAllExam(userId, classId);

        res.status(200).json({ message: 'success', data: allExamRes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

let handleGetDetail = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;

    try {
        const examDetailRes = await examService.getDetail(userId, postId);
        const examId = examDetailRes.examId;
        const questionListRes = await examService.getQuestionList(userId, examId);
        console.log(questionListRes);
        res.status(200).json({ message: 'success', data: examDetailRes, questionListRes: questionListRes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

let handleDeleteExam = async (req, res) => {
    const userId = req.user.id;
    const postId = req.body.postId;

    try {
        const deleteRes = await examService.deleteExam(userId, postId);

        res.status(200).json({ message: 'success', data: deleteRes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

let handleUpdateExam = async (req, res) => {
    const userId = req.user.id;
    const dataUpdate = req.body;

    console.log(dataUpdate);

    try {
        const updateRes = await examService.updateExam(userId, dataUpdate);

        res.status(200).json({ message: 'success', data: updateRes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

module.exports = {
    createExam: createExam,
    getAllExam: getAllExam,
    handleDeleteExam: handleDeleteExam,
    handleGetDetail: handleGetDetail,
    handleUpdateExam: handleUpdateExam,
};
