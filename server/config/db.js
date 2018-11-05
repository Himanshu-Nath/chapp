const consts = require('../util/constant');
const utils = require('../util/utils');
const logger = container.get('logger');

// mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
// Promise.promisifyAll(require("mongoose"));
mongoose.connect(consts.MONGODB_LOCALHOST_URL);
conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
    logger.info("Connected");
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    logger.info("Mongoose default connection disconnected through app termination");
    process.exit(0); 
  });
});