import db from '../models/index.js';
import { QueryTypes } from 'sequelize';

import exerciseService from '../services/exerciseService';
import userService from '../services/userService';
import postService from '../services/postService';
import materialService from '../services/materialService';
import questionService from '../services/questionService';
import moment from 'moment';

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
let getExercise = async (req, res) => {
    const userId = req.user.id;
    let classId = parseInt(req.params.classid);
    let postId = parseInt(req.params.postid);
    let checkUserId = userId;

    if (req.query.userId) {
        checkUserId = parseInt(req.query.userId);
    }

    try {
        const exerciseRes = await exerciseService.getDetail(userId, postId);
        const exerciseId = exerciseRes.exerciseId;

        const checkCompletedRes = await exerciseService.checkIsCompleted(checkUserId, exerciseId);
        res.status(200).json({ message: 'success', exercise: exerciseRes, checkCompletedRes: checkCompletedRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

let getViaTopic = async (req, res) => {
    const userId = req.user.id;
    let classId = req.params.classid;
    let topicId = req.params.topic;

    try {
        const exerciseRes = await exerciseService.getViaTopic(userId, classId, topicId);
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

        // Change column name id => postID
        materialRes.dataValues.postId = materialRes.dataValues.id;
        delete materialRes.dataValues.id;

        res.status(200).json({ message: 'success', materialRes: materialRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

let createExercise = async (req, res) => {
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
    dataInsert.deadline = data.deadline;
    dataInsert.maxScore = 100;

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
        const exerciseRes = await exerciseService.create(userId, dataInsert);

        exerciseRes.dataValues.postId = exerciseRes.dataValues.id;
        delete exerciseRes.dataValues.id;

        res.status(200).json({ message: 'success', exerciseRes: exerciseRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

let createQuestion = async (req, res) => {
    const userId = req.user.id;
    let data = req.body;
    const linkArr = data.links.length > 0 ? data.links.split(',') : [];
    const dataInsert = {};
    const answerData = [];

    dataInsert.link_list = linkArr;
    dataInsert.content = data.content;
    dataInsert.classId = parseInt(data.classId);
    dataInsert.topicId = parseInt(data.topicId);
    dataInsert.typeExe = data.questionType;
    dataInsert.question = data.question;
    dataInsert.deadline = data.deadline;
    dataInsert.maxScore = 100;

    if (data.questionType === 'question_choice') {
        data.answerList.map((item) => {
            answerData.push(JSON.parse(item));
        });
    }

    dataInsert.answerList = answerData;

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
        const questionRes = await questionService.create(userId, dataInsert);

        questionRes.dataValues.postId = questionRes.dataValues.id;
        delete questionRes.dataValues.id;

        res.status(200).json({ message: 'success', questionRes: questionRes });
    } catch (err) {
        res.status(500).json({ message: 'fail', error: err });
    }
};

let updateAssignment = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const linkArr = data.links.length > 0 ? data.links.split(',') : [];
    const linksDeletedArr = data.linksDeleted.length > 0 ? data.linksDeleted.split(',') : [];
    const filesDeletedArr = data.filesDeleted.length > 0 ? data.filesDeleted.split(',') : [];
    const dataUpdate = {};

    dataUpdate.link_list = linkArr;
    dataUpdate.content = data.content;
    dataUpdate.classId = parseInt(data.classId);
    dataUpdate.postId = parseInt(data.postId);
    dataUpdate.title = data.title;
    dataUpdate.deadline = data.deadline;
    dataUpdate.linksDeleted = linksDeletedArr;
    dataUpdate.filesDeleted = filesDeletedArr;

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
        dataUpdate.file_list = file_list;
    }

    try {
        const response = await exerciseService.updateAssignment(userId, dataUpdate);
        const updatedAssignment = await exerciseService.getDetail(userId, dataUpdate.postId);
        const updatedAttachment = await postService.getAttachment(userId, dataUpdate.postId);

        res.status(200).json({
            message: 'success',
            updatedAssignment: updatedAssignment,
            updatedAttachment: updatedAttachment,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let submitAssignment = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const dataSubmit = {};

    dataSubmit.exerciseId = parseInt(data.exerciseId);
    dataSubmit.postId = parseInt(data.postId);

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
        dataSubmit.file_list = file_list;
    }

    console.log(dataSubmit);

    try {
        const response = await exerciseService.submitAssignment(userId, dataSubmit);

        const submitFiles = await exerciseService.getSubmitFiles(userId, dataSubmit.exerciseId);

        res.status(200).json({
            message: 'success',
            submitRes: response,
            submitFiles: submitFiles,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let getSubmitFiles = async (req, res) => {
    const userId = req.user.id;
    let checkUserId = userId;

    if (req.query.userId) {
        checkUserId = parseInt(req.query.userId);
    }

    const exerciseId = parseInt(req.params.exerciseId);

    try {
        const submitFiles = await exerciseService.getSubmitFiles(checkUserId, exerciseId);

        res.status(200).json({
            message: 'success',
            submitFiles: submitFiles,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let handleMarkExercise = async (req, res) => {
    const userId = req.user.id;
    let checkUserId = userId;
    const submitId = parseInt(req.body.submitId) || null;
    const score = parseInt(req.body.score);
    const postId = parseInt(req.body.postId);
    const comment = req.body.comment;

    if (req.body.userId) {
        checkUserId = parseInt(req.body.userId);
    }

    try {
        const markResponse = await exerciseService.markExercise(checkUserId, postId, submitId, score, comment);

        res.status(200).json({
            message: 'success',
            markResponse: markResponse,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let handleUpdateMarkExercise = async (req, res) => {
    const userId = req.user.id;
    let checkUserId = userId;
    const score = parseInt(req.body.score);
    const postId = parseInt(req.body.postId);
    const comment = req.body.comment;

    if (req.body.userId) {
        checkUserId = parseInt(req.body.userId);
    }

    try {
        const markResponse = await exerciseService.updateMarkExercise(checkUserId, postId, score, comment);

        res.status(200).json({
            message: 'success',
            markResponse: markResponse,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let getResultSubmit = async (req, res) => {
    const userId = req.user.id;
    let checkUserId = userId;

    if (req.query.userId) {
        checkUserId = parseInt(req.query.userId);
    }

    const postId = parseInt(req.params.postId);
    // console.log('postId --------', postId);

    try {
        const resultSubmit = await exerciseService.getResultSubmit(checkUserId, postId);
        // console.log('resultSubmit', resultSubmit);

        res.status(200).json({
            message: 'success',
            resultSubmit: resultSubmit,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let handleGetMemberSubmit = async (req, res) => {
    const userId = req.user.id;
    const classId = parseInt(req.params.classId);
    const postId = parseInt(req.params.postId);

    try {
        const memberSubmit = await exerciseService.getMemberSubmit(classId, postId);

        res.status(200).json({
            message: 'success',
            memberSubmit: memberSubmit,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let handleGetNameExercises = async (req, res) => {
    const userId = req.user.id;
    const classId = parseInt(req.params.classId);

    try {
        const nameExercise = await exerciseService.getAllNameExercise(classId);

        res.status(200).json({
            message: 'success',
            nameExercise: nameExercise,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let handleGetScoreAllMem = async (req, res) => {
    const userId = req.user.id;
    const classId = parseInt(req.params.classId);

    try {
        const memList = await userService.getMemberClass(classId, 'HS');
        const data = [];
        for (let i = 0; i < memList.length; i++) {
            const allScore = await exerciseService.getAllScoreExercise(classId, memList[i].userId);
            data.push([{ fullName: memList[i].fullName, userId: memList[i].userId }, ...allScore]);
        }

        console.log(data);

        res.status(200).json({
            message: 'success',
            allScore: data,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let handleGetNotSubmitted = async (req, res) => {
    const userId = req.user.id;
    const classId = req.query.classId;

    console.log(classId);

    try {
        const exerciseRes = await exerciseService.getExerciseViaClass(userId, classId);

        const notSubmittedRes = exerciseRes.filter((item) => item.submitId === null);

        res.status(200).json({
            message: 'success',
            exerciseRes: notSubmittedRes,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let handleGetSubmitted = async (req, res) => {
    const userId = req.user.id;
    const classId = req.query.classId;

    console.log(classId);

    try {
        const exerciseRes = await exerciseService.getExerciseViaClass(userId, classId);

        const submittedRes = exerciseRes.filter((item) => item.submitId !== null);

        res.status(200).json({
            message: 'success',
            exerciseRes: submittedRes,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

let handleGetOutDate = async (req, res) => {
    const userId = req.user.id;
    const classId = req.query.classId;

    console.log(classId);

    try {
        const exerciseRes = await exerciseService.getExerciseViaClass(userId, classId);

        const notSubmittedRes = exerciseRes.filter(
            (item) => item.submitId === null && moment(item.deadline) < moment(),
        );

        res.status(200).json({
            message: 'success',
            exerciseRes: notSubmittedRes,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail', error: err });
    }
};

module.exports = {
    getAll: getAll,
    createMaterial: createMaterial,
    createExercise: createExercise,
    getViaTopic: getViaTopic,
    createQuestion: createQuestion,
    getExercise: getExercise,
    updateAssignment: updateAssignment,
    submitAssignment: submitAssignment,
    getSubmitFiles: getSubmitFiles,
    getResultSubmit: getResultSubmit,
    handleMarkExercise: handleMarkExercise,
    handleGetMemberSubmit: handleGetMemberSubmit,
    handleGetNameExercises: handleGetNameExercises,
    handleGetScoreAllMem: handleGetScoreAllMem,
    handleUpdateMarkExercise: handleUpdateMarkExercise,
    handleGetNotSubmitted: handleGetNotSubmitted,
    handleGetSubmitted: handleGetSubmitted,
    handleGetOutDate: handleGetOutDate,
};
