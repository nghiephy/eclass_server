import db from '../models/index.js';
import { QueryTypes } from 'sequelize';

import exerciseService from '../services/exerciseService';
import materialService from '../services/materialService';

let getAll = async (req, res) => {
    const userId = req.user.id;
    let classId = req.params.classid;

    try {
        const exerciseRes = await exerciseService.getAll(userId, classId);
        res.status(200).json({ message: 'success', exercises: exerciseRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

let createMaterial = async (req, res) => {
    const userId = req.user.id;
    let data = req.body;
    const linkArr = data.links.length > 0 ? data.links.split(',') : [];
    const dataInsert = {};

    dataInsert.link_list = linkArr;
    dataInsert.content = data.content;
    dataInsert.classId = parseInt(data.classId);
    dataInsert.topicId = parseInt(data.topicId);
    dataInsert.type = data.type;
    dataInsert.title = data.title;

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    if (req.files) {
        const files = req.files;
        const file_list = [];
        let index, len;

        // Loop through all the uploaded images and create images_list
        for (index = 0, len = files.length; index < len; ++index) {
            const item = {};
            item.url = `/files/exercise/${files[index].filename}`;
            item.name = files[index].originalname;
            item.type = files[index].mimetype;
            file_list.push(item);
        }
        dataInsert.file_list = file_list;
    }

    console.log('data: ', dataInsert);

    try {
        const materialRes = await materialService.create(userId, dataInsert);
        res.status(200).json({ message: 'success', materialRes: materialRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

module.exports = {
    getAll: getAll,
    createMaterial: createMaterial,
};
