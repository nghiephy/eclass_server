import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import routes from './routes';
require('dotenv').config();

let app = express();
let port = process.env.PORT || 6969;

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

// Routes init
routes(app);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
