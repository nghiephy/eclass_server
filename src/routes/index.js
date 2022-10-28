import siteRouter from './site';
import userRouter from './user';
import classRouter from './class';
import postRouter from './post';

function routes(app) {
    app.use('/', siteRouter);
    app.use('/api/user', userRouter);
    app.use('/api/class', classRouter);
    app.use('/api/post', postRouter);
}

module.exports = routes;
