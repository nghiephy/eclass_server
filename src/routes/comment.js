import express from 'express';
let router = express.Router();

import commentController from '../controllers/commentController';
import middlewareController from '../controllers/middlewareController';

router.post('/create', middlewareController.verifyToken, commentController.createComment);
router.get('/get-all', middlewareController.verifyToken, commentController.getAllComment);

module.exports = router;
