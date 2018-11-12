const bcrypt = require('bcrypt');
var mongoosePaginate = require('mongoose-paginate');
const keys = require('../util/keys');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique : true},
    mobile: {type: Number},
    gender: {type: String},
    password: {type: String},
    access_token: {type: String},
    image: {type: String},
    follow:[],
    follower:[],
    like:[],
    otp: {type: Number},
    login_type: {type: String},
    google_user_id: {type: Number},
    role: {type: String, required: true},
    last_login: {type: String},
    currently_active: {type: Boolean},
    status: {type: Boolean, required: true},
    creation_time: {type: String, default: Date.now, required: true},
    modification_time: {type: String, default: Date.now, required: true}
}, {collection: 'users'});

UserSchema.plugin(mongoosePaginate);

// hash password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, keys.SALT_ROUNDS);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('userCollection', UserSchema);