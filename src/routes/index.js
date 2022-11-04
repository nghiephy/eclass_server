import siteRouter from './site';
import userRouter from './user';
import classRouter from './class';
import postRouter from './post';
import commentRouter from './comment';
import topicRouter from './topic';
import exerciseRouter from './exercise';
import materialRouter from './material';

function routes(app) {
    app.use('/', siteRouter);
    app.use('/api/user', userRouter);
    app.use('/api/class', classRouter);
    app.use('/api/post', postRouter);
    app.use('/api/comment', commentRouter);
    app.use('/api/topic', topicRouter);
    app.use('/api/exercise', exerciseRouter);
    app.use('/api/material', materialRouter);
}

module.exports = routes;
