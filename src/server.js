import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import routes from './routes';
const path = require('path');
// import cors from 'cors';
var cookieParser = require('cookie-parser');

require('dotenv').config();

let app = express();
let port = process.env.PORT || 6969;

// config app

// app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup static path
app.use(express.static(path.join(__dirname, 'public')));

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

viewEngine(app);

// Routes init
routes(app);

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//     console.log('connected: ', socket.id);
// });

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
