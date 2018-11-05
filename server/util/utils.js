const jwt = require('jsonwebtoken');
const fs = require('fs');

const winston = require('winston');
const { format } = winston;
const { combine, json, label } = format;
container = new winston.Container();
container.add('logger', {
    format: combine(
      label({ label: 'category one' }),
      json()
    ),
    transports: [
      new winston.transports.Console({ level: 'silly' }),
      new winston.transports.File({ filename: 'log/chapp.log' })
    ]
});

module.exports = {    
    getJWTToken : function(dataObj, privateKey) {
        let token = jwt.sign(dataObj, privateKey, { algorithm: 'RS384', expiresIn: '1h' });
        return token;
    },

    verifyJWTToken : function(token, publicKey, callback) {
        jwt.verify(token, publicKey, (err, authorizedData) => {
            if(err){
                callback({status: false, error: "Token Expire"});
            } else {
                callback({status: true, error: "Valid Expire"});
            }
        });
    },

    readKeyFile: function(path) {
        return fs.readFileSync(path);
    }
};