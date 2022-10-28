import express from 'express';
let router = express.Router();
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

import postController from '../controllers/postController';
import middlewareController from '../controllers/middlewareController';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/files/post');
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

router.post('/create', middlewareController.verifyToken, uploadMultiple, postController.createPost);
router.get('/get-attachment/:id', middlewareController.verifyToken, postController.getAttachment);

module.exports = router;
