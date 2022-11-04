import db from '../models/index.js';
import { QueryTypes } from 'sequelize';

import materialService from '../services/materialService';

let getMaterial = async (req, res) => {
    const userId = req.user.id;
    let classId = parseInt(req.params.classid);
    let postId = parseInt(req.params.postid);

    try {
        const materialRes = await materialService.getDetail(userId, postId);
        res.status(200).json({ message: 'success', material: materialRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

module.exports = {
    getMaterial: getMaterial,
};
