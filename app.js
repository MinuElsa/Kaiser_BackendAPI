//------------------------------------------------------------------------------
// node.js MongoDB Backend API Starter example for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
var express = require('express');
// create a new express server
var app = express();
// body parser
var bodyParser = require('body-parser');
//path
var path = require('path');
//Added for checking jsonwebtoken
var jwt = require("jsonwebtoken");
// cfenv provides access to your Cloud Foundry environment
var cfenv = require('cfenv');

// get the app environment from Cloud Foundry
// Node server details
var appEnv = cfenv.getAppEnv();
var port = appEnv.port || '6002';
var routeUrl =  appEnv.bind || 'localhost';
// Bind mongodb connection
var mongoUrl = appEnv.getServiceURL('kaiser-project-mongodb');
var mongoService = appEnv.getService("kaiser-project-mongodb");
var mongoose = require('mongoose');
if (mongoUrl == null) {
  //local development
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/project');
} else {
  //Bluemix cloud foundry - Compose service connection
  //var mongooseUrl = 'mongodb://' + mongoService.credentials.user + ':' + mongoService.credentials.password + '@' + mongoService.credentials.uri + ':' + mongoService.credentials.port + '/project';
  var mongooseUrl = mongoService.credentials.url;
  mongoose.Promise = global.Promise;
  mongoose.connect(mongooseUrl, function (err, res) {
	        if (err) {
	          console.log ('ERROR connecting to: ' + mongooseUrl + '. ' + err);
	        } else {
	          console.log ('Succeeded connected ' );
	        }
	      });
}

//JSON body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

// For index.html
app.use(express.static(path.join(__dirname, 'www')));

//project route
var project =  require('./routes/project.js')(app);

//services route
var service =  require('./routes/service.js')(app);

//region route
var region =  require('./routes/region.js')(app);

//group route. MVP1 until LDAP is configured for groups
var group =  require('./routes/group.js')(app);

//user route. MVP1 until LDAP is configured for groups
var user =  require('./routes/user.js')(app);

//ldap authentication 
// insert your changes. Baskar. 
//authentication route
var authentication =  require('./routes/authentication.js')(app);

// start server on the specified port and binding host
app.listen(port, routeUrl, function() {
  console.log("server starting on " + routeUrl + ":" + port);
});
