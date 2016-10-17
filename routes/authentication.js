/**
 * http://usejsdoc.org/
 */
var _ = require('lodash');
var user = require('../models/user.js');

var async = require("async");
var mw = require('../middleware/index.js');
var validateLDAP = require("./frameHttpForMicroSvc.js");
var request = require('request');

module.exports = function(app) {
	app.post('/authenticate', function (req, res, next) {
		console.log("Authenticate.."+req.body.name);
		console.log("req.get('host') is "+req.get('host'));
	
		//Going to call authenticate LDAP method.If the method is success(valid user), token is generated for the user.
		authMS(req, res, next);		
		
		//Going to save user
		console.log("BEFORE CALLING POST USER SAVE "+req.body.name);
		console.log("BEFORE CALLING POST USER SAVE "+req.body.email);
		console.log("BEFORE CALLING POST USER SAVE "+req.body.groups);
		//var requestURL = "http://localhost:6003" + "/users";
		var requestURL = 'http://'+req.get('host') + "/users";
		request({
			url: requestURL,
			method: 'POST',
			json: {
		        email: req.body.email,
		        name: req.body.name,
		        groups: req.body.groups
		    }
		}, function (error, response, body) {
			console.log("ERROR IN AUTH AFTER USER SAVE IS "+response);
		});
	});
};


function authMS(req, res, next) {
	console.log("GOING TO CALL AUTHMS!!"+req.body.name);
    async.waterfall([
        invokeMS(req),
        invokeAuthorization
    ], function (err, success) {
        if (err) {
            res.status(500).json({message: 'Error!'});
            next();
        } else {
        	console.log("RESPONSE IS "+res);
            res.status(200).json({ message: 'Final respoonse:'+success });                        
            next();
        }
    });    
};

// Method to invoke Authentication Microservice 
var invokeMS = function (req) {			
    console.log("--- in invokeMS ---"+req.body.email);	
    
    return function (callback){
  	   validateLDAP.validateLDAPUser(req,function(err, resp){
      	console.log("--- resp from http callback---",resp.response.message);
      	
      	if(err){
      		console.log("--- err message ---");
      		error = err;
      	}else{
      		console.log("---- success response ---");
      		//return(null, resp);
      		response = resp;
      	}
      });
  	   var email = req.body.email;
  	   console.log("email BEFORE CALLBACK IS "+email);
  	  return callback (null, email);
     	//return(callback(error,response));
    }
    
   /* return function (callback) {
        var email = req.body.email;
        callback (null, email);
   } */
};

// Method to generate JSONWebtoken and authorize 
//function invokeAuthorization(req,callback) {
function invokeAuthorization(req,callback) {
	console.log("--- in invokeAuthorization ---");
	console.log("input parameter:"+req);	
		var error=null;
		var data = null;
		
		mw.generateToken(req,function(err,resp){			
			if(err){
				console.log("error in generating token");
				ret = err;
			}
			else{
				console.log("Successfully token generated"+resp);
				data  = resp;
			}
			
		});	
		console.log("BEFOR CALLBACK !! "+data);
		return(callback(error,data));			
		
}




