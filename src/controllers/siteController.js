import db from '../models/index.js';
import { QueryTypes } from 'sequelize';

let getHomePage = async (req, res) => {
    const data = await db.Authorization.findAll({
        attributes: {
            exclude: [`id`],
        },
        require: true,
        include: [
            {
                model: db.User,
                // attributes: [['username', 'username'], 'password', 'createdAt'],
            },
            {
                model: db.Role,
                // attributes: [['username', 'username'], 'password', 'createdAt'],
            },
        ],
        raw: true,
    });
    // const data = await db.sequelize.query('SELECT * FROM `users` JOIN `users_auths` ON users.id = users_auths.userId', {
    //     type: QueryTypes.SELECT,
    // });
    console.log(JSON.stringify(data, null, 2));
    return res.send(data);
};

module.exports = {
    getHomePage: getHomePage,
};
