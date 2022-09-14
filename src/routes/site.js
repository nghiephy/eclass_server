import express from 'express';
let router = express.Router();

import siteController from '../controllers/siteController';

router.get('/', siteController.getHomePage);

module.exports = router;
