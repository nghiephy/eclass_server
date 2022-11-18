import express from 'express';
let router = express.Router();

const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

import exerciseController from '../controllers/exerciseController';
import middlewareController from '../controllers/middlewareController';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/files/exercise');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        // Config your options
        const options = {
            replacement: '-', // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true, // convert to lower case, defaults to `false`
            strict: true, // strip special characters except replacement, defaults to `false`
            locale: 'vi', // language code of the locale to use
        };

        const name_avatar = slugify(file.originalname, options);
        cb(null, name_avatar + '-' + Date.now() + path.extname(file.originalname));
    },
});

let uploadMultiple = multer({ storage: storage }).array('files', 10);

router.get('/get-all/:classid', middlewareController.verifyToken, exerciseController.getAll);
router.get('/get-submit-files/:exerciseId', middlewareController.verifyToken, exerciseController.getSubmitFiles);
router.get('/get-all/:classid/:topic', middlewareController.verifyToken, exerciseController.getViaTopic);
router.get('/get-detail/:classid/:postid', middlewareController.verifyToken, exerciseController.getExercise);
router.get('/get-result-submit/:postId', middlewareController.verifyToken, exerciseController.getResultSubmit);
router.get('/get-name-exercise/:classId', middlewareController.verifyToken, exerciseController.handleGetNameExercises);
router.get('/get-all-score/:classId', middlewareController.verifyToken, exerciseController.handleGetScoreAllMem);
router.get('/get-not-submitted', middlewareController.verifyToken, exerciseController.handleGetNotSubmitted);
router.get('/get-submitted', middlewareController.verifyToken, exerciseController.handleGetSubmitted);
router.get('/get-out-date', middlewareController.verifyToken, exerciseController.handleGetOutDate);
router.get(
    '/get-member-submit/:classId/:postId',
    middlewareController.verifyToken,
    exerciseController.handleGetMemberSubmit,
);
router.post(
    '/TL/create/:classid',
    middlewareController.verifyToken,
    middlewareController.verifyTeacher,
    uploadMultiple,
    exerciseController.createMaterial,
);
router.post('/BT/create', middlewareController.verifyToken, uploadMultiple, exerciseController.createExercise);
router.post('/CH/create', middlewareController.verifyToken, uploadMultiple, exerciseController.createQuestion);
router.post('/update', middlewareController.verifyToken, uploadMultiple, exerciseController.updateAssignment);
router.post('/submit', middlewareController.verifyToken, uploadMultiple, exerciseController.submitAssignment);
router.post('/mark-exercise', middlewareController.verifyToken, exerciseController.handleMarkExercise);
router.post('/update-mark-exercise', middlewareController.verifyToken, exerciseController.handleUpdateMarkExercise);

module.exports = router;
