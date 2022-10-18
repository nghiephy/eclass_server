import db from '../models/index.js';
import { QueryTypes } from 'sequelize';
import userService from '../services/userService';
import jwt from 'jsonwebtoken';

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
    let message = await userService.handleCreateNewUser(req.body);

    return res.status(200).json({
        message,
    });
};

let refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json("You're not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json('Refresh Token is not valid');
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
            console.log(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
        res.status(200).json({
            accessToken: newAccessToken,
        });
    });
};

let handleLogout = async (req, res) => {
    res.clearCookie('refreshToken');
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);

    res.status(200).json('Logged out!');
};

module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    refreshToken: refreshToken,
    handleLogout: handleLogout,
};
