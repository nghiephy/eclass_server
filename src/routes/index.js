import siteRouter from './site';
import userRouter from './user';
import classRouter from './class';
import postRouter from './post';
import commentRouter from './comment';

function routes(app) {
    app.use('/', siteRouter);
    app.use('/api/user', userRouter);
    app.use('/api/class', classRouter);
    app.use('/api/post', postRouter);
    app.use('/api/comment', commentRouter);
}

module.exports = routes;
