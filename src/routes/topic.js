import express from 'express';
let router = express.Router();

import topicController from '../controllers/topicController';
import middlewareController from '../controllers/middlewareController';

router.get('/get-topics/:classid', middlewareController.verifyToken, topicController.getTopics);
router.post('/create', middlewareController.verifyToken, topicController.createTopic);

module.exports = router;
