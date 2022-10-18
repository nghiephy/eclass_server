import express from 'express';
let router = express.Router();

import classController from '../controllers/classController';
import middlewareController from '../controllers/middlewareController';

router.get('/getall', middlewareController.verifyToken, classController.getAllClass);
router.post('/enroll', middlewareController.verifyToken, classController.enrollClass);
router.post('/create', middlewareController.verifyToken, classController.createClass);

module.exports = router;
