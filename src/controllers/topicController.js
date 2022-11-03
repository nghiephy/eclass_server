import db from '../models/index.js';
import { QueryTypes } from 'sequelize';

import topicService from '../services/topicService';

let getTopics = async (req, res) => {
    const userId = req.user.id;
    let classId = req.params.classid;
    classId = parseInt(classId);
    try {
        const topicRes = await topicService.getTopics(userId, classId);
        res.status(200).json({ message: 'success', topics: topicRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

let createTopic = async (req, res) => {
    const userId = req.user.id;
    let classId = req.body.classId;
    let name = req.body.topic;
    classId = parseInt(classId);

    try {
        const topicRes = await topicService.createTopic(userId, classId, name);

        // Change id into topicId
        const topicData = topicRes.dataValues;
        topicData.topicId = topicData.id;
        delete topicData.id;

        res.status(200).json({ message: 'success', response: topicData });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

module.exports = {
    getTopics: getTopics,
    createTopic: createTopic,
};
