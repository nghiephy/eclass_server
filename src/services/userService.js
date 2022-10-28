import db from '../models/index';
import bcrypt from 'bcryptjs';
import sequelize from 'sequelize';
const moment = require('moment');

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExits = await checkUsername(username);
            let userData = {};

            if (isExits) {
                // user is exits
                let user = await db.Users_Auth.findOne({
                    where: {
                        username: username,
                    },
                    attributes: [
                        'username',
                        'password',
                        [sequelize.col('User.id'), 'id'],
                        [sequelize.col('User.fullName'), 'fullName'],
                        [sequelize.col('User.avatar'), 'avatar'],
                        [sequelize.col('User.email'), 'email'],
                        [sequelize.col('User.birthday'), 'birthday'],
                        [sequelize.col('User.locale'), 'locale'],
                        [sequelize.col('User.googleLogin'), 'googleLogin'],
                        [sequelize.col('User.createdAt'), 'joinedDate'],
                    ],
                    include: {
                        model: db.User,
                        attributes: [],
                    },
                    raw: true,
                });
                if (user) {
                    const check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = '';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = 'User is not found';
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = "Your's username isn't exits in ours system";
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let handleCreateNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isExitsUsername = await checkUsername(data.username);
            if (!isExitsUsername) {
                let hashPasswordFromBcrypt = await hashUserPassowrd(data.password);
                const userIntance = await db.User.create({
                    fullName: data.fullname,
                    email: data.email,
                    locale: 'Vi',
                });
                const usersAuthIntance = await db.Users_Auth.create({
                    username: data.username,
                    password: hashPasswordFromBcrypt,
                    userId: userIntance.dataValues.id,
                });
                resolve('User was created succeed!');
            } else {
                reject('This username was used!');
            }
        } catch (e) {
            reject(e);
        }
    });
};

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users_Auth.findOne({
                where: {
                    username: username,
                },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let hashUserPassowrd = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashedPassword = await bcrypt.hashSync(password, salt);
            resolve(hashedPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let handleGetInfor = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    id: userId,
                },
                raw: true,
            });
            const birthdayFormated = moment.utc(user.birthday).format('YYYY-MM-DD');
            const createdAtFormated = moment.utc(user.createdAt).format('YYYY-MM-DD HH:mm:ss');
            const updatedAtFormated = moment.utc(user.updateddAt).format('YYYY-MM-DD HH:mm:ss');
            user.birthday = birthdayFormated;
            user.createdAt = createdAtFormated;
            user.updatedAt = updatedAtFormated;
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
};

let handleUpdateInfor = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedRows = await db.User.update(
                {
                    fullName: data.fullName,
                    avatar: data.avatarPath,
                    email: data.email,
                    birthday: data.birthday,
                },
                {
                    where: {
                        id: userId,
                    },
                },
            );

            resolve(updatedRows);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    handleCreateNewUser: handleCreateNewUser,
    handleGetInfor: handleGetInfor,
    handleUpdateInfor: handleUpdateInfor,
};
