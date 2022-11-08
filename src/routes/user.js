import express from 'express';
let router = express.Router();
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

import userController from '../controllers/userController';
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

router.post('/login', userController.handleLogin);
router.post('/register', userController.handleRegister);
router.get('/refresh', userController.refreshToken);
router.post('/logout', userController.handleLogout);
router.get('/getinfor/:userId', middlewareController.verifyToken, userController.handleGetInfor);
router.get('/get-all/:classId', middlewareController.verifyToken, userController.getAllViaClass);
router.post('/update', middlewareController.verifyToken, uploadSingle, userController.handleUpdate);

module.exports = router;
