import siteRouter from './site';
import userRouter from './user';
import classRouter from './class';

function routes(app) {
    app.use('/', siteRouter);
    app.use('/api/user', userRouter);
    app.use('/api/class', classRouter);
}

module.exports = routes;
