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
            if (data === true) {
                res.status(200).json({ message: 'enroll sccuessful', code: 0 });
            }
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(500).json({ message: 'you joined this class', code: 1 });
            } else {
                res.status(500).json({ message: 'invalid key', code: 2 });
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
            name: data.name,
            semeter: data.semeter || '',
            topic: data.topic || '',
            room: data.room || '',
        });

        res.status(200).json({ message: 'success', data: dataRes });
    } catch (err) {
        res.status(500).json({ message: 'fail' });
    }
};

module.exports = {
    getAllClass: getAllClass,
    enrollClass: enrollClass,
    createClass: createClass,
};
