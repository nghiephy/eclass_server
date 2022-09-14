import siteRouter from './site';

function routes(app) {
    app.use('/', siteRouter);
}

module.exports = routes;
