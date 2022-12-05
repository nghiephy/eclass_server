import express from 'express';
let router = express.Router();
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

import examController from '../controllers/examController';
import middlewareController from '../controllers/middlewareController';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/img/avatar');
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

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let uploadSingle = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');

router.post('/create', middlewareController.verifyToken, examController.createExam);
router.post('/delete', middlewareController.verifyToken, examController.handleDeleteExam);
router.post('/update', middlewareController.verifyToken, examController.handleUpdateExam);
router.post('/join', middlewareController.verifyToken, examController.handleJoinExam);
router.post('/update-result', middlewareController.verifyToken, examController.handleUpdateResult);
router.get('/get-all/:classId', middlewareController.verifyToken, examController.getAllExam);
router.get('/detail/:postId', middlewareController.verifyToken, examController.handleGetDetail);

module.exports = router;
