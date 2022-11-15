import db from '../models/index.js';
import { QueryTypes } from 'sequelize';
const fs = require('fs');
const path = require('path');

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

let handleUpdateCoverImg = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    let coverImgPath = '';
    let coverOldPath = path.resolve(__dirname, '../public') + data.old_cover;
    console.log(coverOldPath);

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.file) {
        coverImgPath = data.old_cover;
    } else {
        coverImgPath = '/img/cover/' + req.file.filename;

        if (data.old_cover && data.old_cover !== '/img/cover/example_cover.jpg') {
            fs.unlink(coverOldPath, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }
    }

    try {
        const respone = await classService.handleUpdateCover(parseInt(data.classId), coverImgPath);

        res.status(200).json({ message: 'success', coverImgPath: coverImgPath });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

let handleCustomKey = async (req, res) => {
    const userId = req.user.id;
    const classId = parseInt(req.params.classId);
    const value = req.body.value;
    const code = req.body.code;

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
    handleUpdateCoverImg: handleUpdateCoverImg,
};
