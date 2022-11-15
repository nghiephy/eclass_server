import db from '../models/index';
import sequelize from 'sequelize';
import { QueryTypes } from 'sequelize';

import postService from './postService';

let getClasses = (userId, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let classes = await db.Authorization.findAll({
                where: {
                    userId: userId,
                    role: role,
                },
                attributes: [
                    'userId',
                    ['createdAt', 'joinDate'],
                    ['class', 'classId'],
                    [sequelize.col('Class.User.fullName'), 'teacherName'],
                    [sequelize.col('Class.User.id'), 'teacherId'],
                    [sequelize.col('Class.name'), 'className'],
                    [sequelize.col('Class.topic'), 'classTopic'],
                    [sequelize.col('Class.semester'), 'semester'],
                    [sequelize.col('Class.room'), 'classRoom'],
                    [sequelize.col('Class.enrollKey'), 'enrollKey'],
                    [sequelize.col('Class.coverImg'), 'coverImg'],
                    [sequelize.col('Class.createdAt'), 'createdDate'],
                    [sequelize.col('Class.primaryColor'), 'primaryColor'],
                ],
                include: [
                    {
                        model: db.Class,
                        attributes: [],
                        include: {
                            model: db.User,
                            attributes: ['id', 'fullName'],
                        },
                    },
                ],
                raw: true,
            });
            resolve(classes);
        } catch (error) {
            reject(error);
        }
    });
};

let enrollClass = (userId, enrollKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            const classData = await db.Class.findOne({
                where: {
                    enrollKey: enrollKey,
                    isBlockKey: false,
                },
                attributes: ['id'],
            });

            if (!classData) {
                reject({ code: 'INVALID_KEY' });
            } else {
                const classId = classData.dataValues.id;
                let date_ob = new Date();
                let date = ('0' + date_ob.getDate()).slice(-2);
                let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
                let year = date_ob.getFullYear();
                let hours = date_ob.getHours();
                let minutes = date_ob.getMinutes();
                let seconds = date_ob.getSeconds();

                const timestamp = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
                const enrollRes = await db.sequelize.query(
                    `INSERT INTO Authorizations (userId, class, role, createdAt, updatedAt) VALUES (${userId}, ${classId}, 'HS', '${timestamp}', '${timestamp}')`,
                    {
                        type: QueryTypes.INSERT,
                    },
                );
                resolve(classData);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let createClass = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let date_ob = new Date();
            let date = ('0' + date_ob.getDate()).slice(-2);
            let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();

            const timestamp = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;

            const classData = await db.Class.create({
                teacherId: userId,
                name: data.name,
                topic: data.topic,
                semester: data.semester,
                room: data.room,
                enrollKey: makeKey(5) + getRandomInt(1000),
                coverImg: '',
                primaryColor: 'blue',
                createdAt: `${timestamp}`,
                updatedAt: `${timestamp}`,
            });

            const addTeacher = await db.sequelize.query(
                `INSERT INTO Authorizations (userId, class, role, createdAt, updatedAt) VALUES (${userId}, ${classData.id}, 'GV', '${timestamp}', '${timestamp}')`,
                {
                    type: QueryTypes.INSERT,
                },
            );

            resolve(classData);
        } catch (error) {
            reject(error);
        }
    });
};

let getClass = (userId, classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const classData = await db.Class.findOne({
                where: {
                    id: classId,
                },
                include: {
                    model: db.Authorization,
                    where: {
                        userId: userId,
                    },
                    attributes: [],
                },
            });
            resolve(classData);
        } catch (error) {
            reject(error);
        }
    });
};

let getAllPost = (userId, classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const annoucePost = await postService.getAnnouPost(userId, classId);
            resolve(annoucePost);
        } catch (error) {
            reject(error);
        }
    });
};

let toggleBlockKey = (classId, value) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateRes = await db.Class.update(
                {
                    isBlockKey: value,
                },
                {
                    where: {
                        id: classId,
                    },
                },
            );
            resolve(updateRes);
        } catch (error) {
            reject(error);
        }
    });
};

let toggleHiddenKey = (classId, value) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateRes = await db.Class.update(
                {
                    isHiddenKey: value,
                },
                {
                    where: {
                        id: classId,
                    },
                },
            );
            resolve(updateRes);
        } catch (error) {
            reject(error);
        }
    });
};

let changeEnrollKey = (classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateRes = await db.Class.update(
                {
                    enrollKey: makeKey(5) + getRandomInt(1000),
                },
                {
                    where: {
                        id: classId,
                    },
                },
            );
            resolve(updateRes);
        } catch (error) {
            reject(error);
        }
    });
};

let handleUpdateCover = (classId, coverImgPath) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedRows = await db.Class.update(
                {
                    coverImg: coverImgPath,
                },
                {
                    where: {
                        id: classId,
                    },
                },
            );

            resolve(updatedRows);
        } catch (e) {
            reject(e);
        }
    });
};

function makeKey(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    getClasses: getClasses,
    enrollClass: enrollClass,
    createClass: createClass,
    getClass: getClass,
    getAllPost: getAllPost,
    toggleBlockKey: toggleBlockKey,
    toggleHiddenKey: toggleHiddenKey,
    changeEnrollKey: changeEnrollKey,
    handleUpdateCover: handleUpdateCover,
};
