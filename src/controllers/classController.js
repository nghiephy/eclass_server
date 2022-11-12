import db from '../models/index.js';
import { QueryTypes } from 'sequelize';

import classService from '../services/classService';

let getAllClass = async (req, res) => {
    const userId = req.user.id;

    if (userId) {
        const dataGv = await classService.getClasses(userId, 'GV');
        const dataHs = await classService.getClasses(userId, 'HS');

        res.status(200).json({ message: 'ok', data: { classTeach: dataGv, classStudy: dataHs } });
    } else {
        res.status(500).json({ message: 'missing parameters' });
    }
};

let enrollClass = async (req, res) => {
    const userId = req.user.id;
    const enrollKey = req.body.enrollKey;

    if (enrollKey) {
        try {
            const data = await classService.enrollClass(userId, enrollKey);
            res.status(200).json({ message: 'enroll sccuessful', code: 0, data: data });
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(500).json({ message: 'you joined this class', code: 'joined' });
            } else {
                res.status(500).json({ message: 'invalid key', code: 'invalid' });
            }
        }
    } else {
        res.status(500).json({ message: 'missing parameters' });
    }
};

let createClass = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    try {
        const dataRes = await classService.createClass(userId, {
            name: data.classname,
            semester: data.semester || '',
            topic: data.topic || '',
            room: data.room || '',
        });

        res.status(200).json({ message: 'success', data: dataRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

let getClassDetail = async (req, res) => {
    const userId = req.user.id;
    const classId = req.params.id;
    const role = req.query.role;

    const classRes = await classService.getClass(userId, classId);

    if (classRes) {
        res.status(200).json({ message: 'ok', data: classRes });
    } else {
        res.status(200).json({ message: 'get class fail' });
    }
};

let getAllPost = async (req, res) => {
    const userId = req.user.id;
    const classId = req.params.id;
    const role = req.query.role;

    const classRes = await classService.getAllPost(userId, classId);

    if (classRes) {
        res.status(200).json({ message: 'ok', data: classRes });
    } else {
        res.status(200).json({ message: 'get class fail' });
    }
};

let handleCustomKey = async (req, res) => {
    const userId = req.user.id;
    const classId = parseInt(req.params.classId);
    const value = req.body.value;
    const code = req.body.code;

    console.log('classId', classId);
    console.log('value', value);

    try {
        if (code === 'blockKey') {
            const updateRes = await classService.toggleBlockKey(classId, !value);
        }
        if (code === 'hiddenKey') {
            const updateRes = await classService.toggleHiddenKey(classId, !value);
        }
        if (code === 'changeKey') {
            const updateRes = await classService.changeEnrollKey(classId);
        }

        const classRes = await classService.getClass(userId, classId);

        res.status(200).json({ message: 'ok', data: classRes });
    } catch (error) {
        res.status(200).json({ message: 'get class fail' });
    }
};

module.exports = {
    getAllClass: getAllClass,
    enrollClass: enrollClass,
    createClass: createClass,
    getClassDetail: getClassDetail,
    getAllPost: getAllPost,
    handleCustomKey: handleCustomKey,
};
