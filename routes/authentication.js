/**
 * http://usejsdoc.org/
 */
var _ = require('lodash');
var user = require('../models/user.js');

var async = require("async");
var mw = require('../middleware/index.js');
var validateLDAP = require("./frameHttpForMicroSvc.js");
var request = require('request');

//dependencies : Crypto module with password and encryption type
var crypto = require('crypto');
var cipherPwd = 'secret_key';//process.env.secretKey;
var encryptionType = 'aes192';

module.exports = function(app) {
	app.post('/authenticate', function (req, res, next) {
		console.log("Authenticate.."+req.body.name);
		console.log("req.get('host') is "+req.get('host'));
	
		//TO BE DELETED(ENCRYPTING REQ)
		var encryptedData = encryptData(req);
		console.log("encryptedData is "+encryptedData);
		
		var decryptedData = decryptData(encryptedData);
		console.log("decryptedData is "+decryptedData);
		//Going to call authenticate LDAP method.If the method is success(valid user), token is generated for the user.
		//authMS(req, res, next);
		var obj = JSON.parse(decryptedData);
		authMS(obj, res, next);
		
		//Going to save user		
		console.log("BEFORE CALLING POST USER SAVE EMAIL IS "+obj.email);
		console.log("BEFORE CALLING POST USER SAVE PASSWORD IS "+obj.password);	
		
		console.log("req.get('host') is "+req.get('host'));		
		
		//var requestURL = "http://localhost:6003" + "/users";
		//var requestURL = "http://minu-kaiser-project.mybluemix.net" + "/users";
	/*	var requestURL = 'http://'+req.get('host') + "/users";
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
		});*/
	});
};

//decrypt data using crypto
function decryptData(data){
	console.log("Inside decryptData..");
    var decipher = crypto.createDecipher(encryptionType, cipherPwd);
    console.log("decipher is "+decipher);
    try {
        var decrypted = decipher.update(data, 'hex', 'utf8');
        console.log("decrypted1 is "+decrypted);
        decrypted += decipher.final('utf8');
        console.log("decrypted1 is "+decrypted);
        return decrypted;
    } catch (exception) {
    	console.log("Exception in decrypting...")
        //callback(exception);
    }  
};

function authMS(req, res, next) {
	console.log("GOING TO CALL AUTHMS!!"+req.email);
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
    console.log("--- in invokeMS ---"+req.email);
    var error=null;
    var response = null;
    
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
  	   var email = req.email;
  	   console.log("email BEFORE CALLBACK IS "+email);
  	  return callback (null, email);
     	//return(callback(error,response));
    }

  /*  return function (callback){
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
    
    	return(callback(error,response));
   } */
    
 /*   return function (callback) {
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

//ENCRYPTION
function encryptData(data){
	console.log("Inside encryptData..");
	var dataString = JSON.stringify(data.body);
	console.log("dataString is "+dataString);
    var cipher = crypto.createCipher(encryptionType, cipherPwd);
    console.log("cipher is "+cipher);
    try {
    	var encrypted = cipher.update(dataString, 'utf8', 'hex');
    	console.log("encrypted1 is "+encrypted);
        encrypted += cipher.final('hex');
        console.log("encrypted1 is "+encrypted);
        return encrypted;
    } catch (exception) {
        //callback(exception);
    }  
};




