const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
io = require('socket.io')(http);
const consts = require('./server/util/constant');
const utils = require('./server/util/utils');
const socketIo = require('./server/config/socket');
mongoose = require('mongoose');
async = require('async');
jwt = require('jsonwebtoken');
require('./server/config/db');

const logger = container.get('logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var userImpl = require('./server/serviceImpl/userImpl');

// app.use(function (req, res, next) {
//     logger.info("URL: " + req.url);
//     if (req.url.includes("admin")) {
//         if (req.url == "/api/admin/register" || req.url == "/api/admin/login") {
//             next();
//         } else {
//             userImpl.validateAdminToken(req.get(consts.AUTH_TOKEN), function (response) {
//                 if (response.status) {
//                     next();
//                 } else {
//                     res.status(401).send({ status: false, message: consts.FAIL, devMsg: response.error });
//                 }
//             })
//         }
//     } else if(req.url.includes("user")){
//         if (req.url == "/api/user/googletokenverify" || req.url == "/api/user/register" || req.url == "/api/user/login"
//             || req.url == "/api/user/forgotpassword" || req.url == '/api/user/otpverification' ) {
//             next();
//         } else {
//             userImpl.validateUserToken(req.get(consts.AUTH_TOKEN), function (response) {
//                 if (response.status) {
//                     next();
//                 } else {
//                     res.status(401).send({ status: false, message: consts.FAIL, devMsg: response.error });
//                 }
//             })
//         }
//     }
// });

var User = require('./server/routes/users');

app.get('/api/user/googletokenverify', User.googleTokenVerification);
app.post('/api/user/register', User.registerUser);
app.post('/api/user/login', User.loginUser);
app.post('/api/user/forgotpassword', User.forgotPassword);
app.post('/api/user/otpverification', User.otpVerification);
app.put('/api/user/logout/:email', User.logoutUser);

app.get('/api/user/logout/:email', User.logoutUser);

app.post('/api/admin/register', User.registerAdmin);
app.post('/api/admin/login', User.loginAdmin);

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/app', express.static(__dirname + '/app'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(consts.PORT, function () {
    logger.info('Server running at port number: '+consts.PORT);
})