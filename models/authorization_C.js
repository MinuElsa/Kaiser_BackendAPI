/**
 * http://usejsdoc.org/
 */

var dbJs = require('./db.js');

var mongoose = require("mongoose");

var userRoleAuthorizationSchema = mongoose.Schema({
	user_name 	: String,
	password	: String,
	accessToken : String,
	role 		: String,
	user_type	: String
});

var userAuth = mongoose.model('userRoleAuthorization',userRoleAuthorizationSchema);

module.exports = userAuth;
