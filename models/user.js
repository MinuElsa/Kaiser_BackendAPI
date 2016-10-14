var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    id: String,
    token: String,
    email: String,
    name: String,
    type: String,
    password: String, 
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);