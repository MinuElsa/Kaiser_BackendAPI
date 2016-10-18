/**
 * http://usejsdoc.org/
 */

var moment = require('moment');
var jwt =  require('jsonwebtoken');
var user = require('../models/user.js');

//var jwtSecret = process.env.secretKey; // this has to be in process environment var
var jwtSecret = "jsontoken";
var encryptionType = "HS256";

exports.generateToken = function(req,callback) {
	console.log("==== In sendToken ====");
    var expires = moment().add(8, 'm').valueOf();
    console.log("expire value:"+expires);

    console.log("==== username:"+req);
    var token = jwt.sign({
    	iss:req,
        exp: expires
    	}, jwtSecret,{ algorithm: encryptionType });
    console.log("token value:"+token);
    return callback(null,token); 		
}

exports.verifyToken = function(req,callback) {
	console.log("==== In verifyToken ===");
	var token = req.headers['x-access-token'];
	console.log("receivedToken:"+token);
	
	 if (typeof(token) === 'undefined') {
		 res.json({info: 'no-access-token'});
	       // error.custom = 'no-access-token';
	        return callback(res);

	 }
	 
	 jwt.verify(token,jwtSecret,function(err,decoded){
		
		   if (err) {
			   console.log("can-not-verify-token");
	            err.custom = 'can-not-verify-token';
	            return callback(err);
	        }
		 
		 if (decoded.exp < moment().valueOf()) {
	        // var error = new Error();
	         //err.custom = 'token-expired';
			 //res.json({info: 'token-expired'});
			 console.log("token-expired");
	         return callback(null,err);
	     }
		 
		 console.log("DECODED IS "+decoded);
		 console.log("decoded.iss is "+decoded.iss);
		 user.findOne({ 'email': decoded.iss },function(err,user) {
			 console.log("=== Inside findOne ===" + err);
				 if(err){
					 console.log("IN ERROR@@@")
					 return(callback(null,err));
				 }	 
				 console.log("NO ERROR@@@");	
				 if(!user){
					 console.log("=== user not found ===");
					 err.custom = 'user not found';
					 return(callback(null,err));
				 }
				 console.log("FOUND USER!!!");
				 //return callback(null,'success');
				 return callback(null, user);
			 }
		 );
	 });
} 

