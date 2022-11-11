import db from '../models/index.js';
import { QueryTypes } from 'sequelize';
import userService from '../services/userService';
import jwt from 'jsonwebtoken';
const fs = require('fs');
const path = require('path');

let refreshTokens = [];

let generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            name: user.fullName,
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '365d' },
    );
};

let generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            name: user.fullName,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '30h' },
    );
};

let handleLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameters',
        });
    }

    let userData = await userService.handleUserLogin(username, password);

    let accessToken = '';
    let refreshToken = '';

    if (userData.user) {
        accessToken = generateAccessToken(userData.user);
        refreshToken = generateRefreshToken(userData.user);

        refreshTokens.push(refreshToken);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
    }

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        accessToken,
        user: userData.user ? userData.user : {},
    });
};

let handleRegister = async (req, res) => {
    try {
        let message = await userService.handleCreateNewUser(req.body);
        return res.status(200).json({
            message,
        });
    } catch (err) {
        return res.status(400).json({
            err,
        });
    }
};

let refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json("You're not authenticated");
    }
    // if (!refreshTokens.includes(refreshToken)) {
    //     return res.status(403).json('Refresh Token is not valid');
    // }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
        if (err) {
            console.log(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        // const newRefreshToken = generateRefreshToken(user);
        // refreshTokens.push(newRefreshToken);
        // res.cookie('refreshToken', newRefreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     path: '/',
        //     sameSite: 'strict',
        // });
        try {
            const dataUser = await userService.handleGetInfor(user.id);
            res.status(200).json({
                accessToken: newAccessToken,
                dataUser,
            });
        } catch (err) {
            res.status(500).json({
                message: 'get infor user fail!',
            });
        }
    });
};

let handleLogout = async (req, res) => {
    res.clearCookie('refreshToken');
    // refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);

    res.status(200).json('Logged out!');
};

let handleGetInfor = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userService.handleGetInfor(userId);
        res.status(200).json({ message: 'success', user: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

let handleUpdate = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    let avatarPath = '';
    let avatarOldPath = path.resolve(__dirname, '../public') + data.old_avatar;
    console.log(avatarOldPath);

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.file) {
        avatarPath = data.old_avatar;
    } else {
        avatarPath = '/img/avatar/' + req.file.filename;

        if (data.old_avatar !== '/img/avatar/example_avatar.jpg') {
            fs.unlink(avatarOldPath, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }
    }

    data.avatarPath = avatarPath;

    try {
        const respone = await userService.handleUpdateInfor(userId, data);

        res.status(200).json({ message: 'success', data: data, respone });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

let getAllViaClass = async (req, res) => {
    const userId = req.user.id;
    const classId = parseInt(req.params.classId);

    try {
        const studentData = await userService.getMemberClass(classId, 'HS');
        const teacherData = await userService.getMemberClass(classId, 'GV');

        res.status(200).json({ message: 'success', studentData: studentData, teacherData: teacherData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

let getStudentViaClass = async (req, res) => {
    const userId = req.user.id;
    const classId = parseInt(req.params.classId);

    try {
        const studentData = await userService.getMemberClass(classId, 'HS');

        res.status(200).json({ message: 'success', studentData: studentData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'fail' });
    }
};

module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    refreshToken: refreshToken,
    handleLogout: handleLogout,
    handleGetInfor: handleGetInfor,
    handleUpdate: handleUpdate,
    getAllViaClass: getAllViaClass,
    getStudentViaClass: getStudentViaClass,
};
