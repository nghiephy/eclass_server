import db from '../models/index.js';
import { QueryTypes } from 'sequelize';
import jwt from 'jsonwebtoken';
const fs = require('fs');
const path = require('path');

import examService from '../services/examService';

let createExam = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

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
    const classIdArr = req.query.classId;

    const classIdSearch = classId === 'null' ? classIdArr : classId;

    console.log('classIdSearch----', classIdSearch);

    try {
        const allExamRes = await examService.getAllExam(userId, classIdSearch);

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

let handleJoinExam = async (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    const password = req.body.password;

    try {
        const joinRes = await examService.joinExam(userId, password, postId);

        res.status(200).json({ message: 'success', data: joinRes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

const handleUpdateResult = async (req, res) => {
    const userId = req.body.userId;
    const { dataUpdate, answerList } = req.body;

    try {
        const joinRes = await examService.updateResult(userId, dataUpdate, answerList);

        res.status(200).json({ message: 'success', data: joinRes });
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
    handleJoinExam: handleJoinExam,
    handleUpdateResult: handleUpdateResult,
};
