var consts = require('../util/constant');
var keys = require('../util/keys');
var utils = require('../util/utils');
var email = require('../config/email');
const logger = container.get('logger');
module.exports = {
    //Send Mail
    sendMail: function (emailObject, callback) {
        let transporter = email.createTransport();
        logger.debug("sendMail: transporter created successfully");
        let mailOptions = {
            from: emailObject.from_name +'" 👻" <' + emailObject.from + '>',
            to: emailObject.to,
            subject: emailObject.subject,
            html: emailObject.body,
            auth: {
                user: keys.EMAIL.user,
                refreshToken: keys.EMAIL.refreshToken
            }
        };
        email.sendMail(transporter, mailOptions, function(status){
            callback(status);
        });
    }
}