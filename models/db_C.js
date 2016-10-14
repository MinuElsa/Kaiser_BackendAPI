// cfenv provides access to your Cloud Foundry environment
var cfenv = require('cfenv');
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var port = appEnv.port || '6002';
var routeUrl =  appEnv.bind || 'localhost';
var mongoUrl = appEnv.getServiceURL('project-mongodb');
var mongoService = appEnv.getService("project-mongodb");

var mongoose = require('mongoose');

if (mongoUrl == null) {
	//local development
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost/project');
} else {
	//Bluemix cloud foundry - Compose service connection
	var mongooseUrl = 'mongodb://' + mongoService.credentials.username + ':' + mongoService.credentials.password + '@' + mongoService.credentials.url + ':' + mongoService.credentials.port + '/db';
	console.log('IN DB JS mongooseUrl:' + mongooseUrl);
	mongoose.Promise = global.Promise;
	mongoose.connect(mongooseUrl);
}

module.exports = mongoose;
