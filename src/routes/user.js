import express from 'express';
let router = express.Router();

import userController from '../controllers/userController';
import middlewareController from '../controllers/middlewareController';

router.post('/login', userController.handleLogin);
router.post('/register', userController.handleRegister);
router.get('/refresh', userController.refreshToken);
router.post('/logout', userController.handleLogout);

module.exports = router;
