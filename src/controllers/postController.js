import db from '../models/index.js';
import { QueryTypes } from 'sequelize';

import postService from '../services/postService';

let createPost = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const linkArr = data.links.length > 0 ? data.links.split(',') : [];
    const dataInsert = {};

    dataInsert.link_list = linkArr;
    dataInsert.content = data.content;
    dataInsert.classId = data.classId;
    dataInsert.type = data.type;

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
            item.url = `/files/post/${files[index].filename}`;
            item.name = files[index].originalname;
            item.type = files[index].mimetype;
            file_list.push(item);
        }
        dataInsert.file_list = file_list;

        console.log(dataInsert);
    }

    try {
        await postService.createPost(userId, dataInsert);
        res.status(200).json({ message: 'success', data: data, userId });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

let getAttachment = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;

    try {
        const data = await postService.getAttachment(userId, postId);
        res.status(200).json({ message: 'success', data: data });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

module.exports = {
    createPost: createPost,
    getAttachment: getAttachment,
};
