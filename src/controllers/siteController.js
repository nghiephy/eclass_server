import db from '../models/index.js';

let getHomePage = async (req, res) => {
    const data = await db.User.findAll({
        include: {
            model: db.Users_Auth,
        },
        raw: true,
    });
    console.log(data);
    return res.render('homepage.ejs');
};

module.exports = {
    getHomePage: getHomePage,
};
