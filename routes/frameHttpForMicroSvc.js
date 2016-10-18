/**
 * http://usejsdoc.org/
 */

//var querystring = require('querystring');
var https = require('https');
var request = require('request');


exports.validateLDAPUser=function(req,callback)
{
	console.log("--- http call ---");
	console.log(req.email);
	console.log(req.password);
	 var services_vcap = JSON.parse(process.env.VCAP_SERVICES || "{}");
	 console.log("services_vcap is "+services_vcap);
	 //var serviceUrl = services_vcap.Authentication[0].credentials.serviceUrl;	
	 	 
	 //if(services_vcap == null || serviceUrl == null){
	 var authService = services_vcap['Kaiser-Pilot_Authentication'][0];
	 console.log("authService is "+authService);
	 var serviceUrl = authService.credentials.serviceUrl;	 
     console.log("serviceUrl IS ** "+serviceUrl);
     var apiKey = authService.credentials.apiKey; 
     console.log("apiKey is *** "+apiKey);
	//}
     //First API to initiate ldap authenticatio /auth/ldap
     var firstAuthRequestURL = serviceUrl + "/auth/ldap";

     //Reading apikey from VCAP
     //var apiKey = services_vcap.Authentication[0].credentials.apiKey;
     /*if(apiKey == null){
	 var apiKey =  "e62c4360-9076-11e6-be1b-07f94c7038be";
     }*/
     
     //Headers for POST call
     var headers = {
         apiKey : apiKey
     }

     //This API will initiate the authentication to providers. Checks if any prehooks are available for provider.
     //Here we are handling only for without prehooks. If response says any prehooks available then throw the message
     request({
         url: firstAuthRequestURL, //URL to hit
         method: 'POST',
         headers: headers
     }, function(error, response, body){
    	 if(error) {
	         console.log(error);
	         res.send(400, JSON.stringify(error));
    	 }
    	 else if(response.statusCode === 302 || response.statusCode === 303){
             var responseBody = JSON.parse(body);
             var checkNextCall = "/generateOtp";
             console.log("Body after call "+ body);

             if(responseBody.nextCall === checkNextCall) {
                 res.send(response.statusCode, {message:"There are some prehooks available for provider. This sample template application cannot proceed further"});
             }
             //If nextCall is /ldap then process the second request /ldap with the token received in body of previous /auth/ldap call
             else if(responseBody.nextCall === "/ldap") {
            	 //callback(null,{message:'response from http'+responseBody});

                 var secondAuthRequestURL = serviceUrl + responseBody.nextCall;
                 headers.token = responseBody.token;
               //  headers.dn = req.body.dn;
               //  headers.password = req.body.password;
                 if(headers.dn == null){
                	 headers.dn = "cn=santhosh,dc=people,dc=cts";
                 }
                 if(headers.password == null){
                	 headers.password = "password-1";
                 }
                 request({
                         url: secondAuthRequestURL, //URL to hit
                         method: 'POST',
                         headers: headers
                     }, function(error, response, body){
                         if(error) {
                             console.log(error);
                             res.send(400, error);
                         }
                         else if(response.statusCode === 302 || response.statusCode === 303){
                             res.send(response.statusCode, {message:"There are some posthooks available for provider. This sample template application cannot proceed further"});
                         }
                         else if(response.statusCode === 200 ){
                            // res.send(response.statusCode, JSON.parse(body));
                        	 callback(null,{response :JSON.parse(body)});
                         }
                         else if(response.statusCode === 401 || response.statusCode === 400 ) {
                             res.send(response.statusCode, JSON.parse(body));
                         }
                     }
                 )
             
             }

    	 }
     });
}





