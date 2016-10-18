var _ = require('lodash');
var user = require('../models/user.js');
var group = require('../models/group.js');

module.exports = function(app) {

    /* Create */
    app.post('/users', function (req, res) {
    	console.log("IN POST USER SAVE");
    	console.log("req body is "+req.body.name);
    	console.log("req body is "+req.body.email);
    	console.log("req body is "+req.body.groups);
        user.find({email : req.body.email}, function (err, docs) {
    		console.log("docs.length is "+docs.length);
            if (!docs.length){
            	var newuser = new user(req.body);
                newuser.save(function(err) {     	
                    if (err) {
                        res.json({info: 'error during user create', error: err});
                    };
                    res.json({info: 'user created successfully'});
                });
            }else{
            	res.json({info: 'user already created'});
            }
        });
    });

    /* Read */
    app.get('/users', function (req, res) {
        user.find(function(err, users) {
            if (err) {
                res.json({info: 'error during find users', error: err});
            };
            res.json({info: 'users found successfully', data: users});
        });
    });

    app.get('/users/:id', function (req, res) {
        user.findById(req.params.id, function(err, user) {
            if (err) {
                res.json({info: 'error during find user', error: err});
            };
            if (user) {
                res.json({info: 'user found successfully', data: user});
            } else {
                res.json({info: 'user not found'});
            }
        });
    });

    /* Update */
    app.put('/users/:id', function (req, res) {
        user.findById(req.params.id, function(err, user) {
            if (err) {
                res.json({info: 'error during find user', error: err});
            };
            if (user) {
                _.merge(user, req.body);
                user.save(function(err) {
                    if (err) {
                        res.json({info: 'error during user update', error: err});
                    };
                    res.json({info: 'user updated successfully'});
                });
            } else {
                res.json({info: 'user not found'});
            }

        });
    });

    /* Delete */
    app.delete('/users/:id', function (req, res) {
        user.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove user', error: err});
            };
            res.json({info: 'user removed successfully'});
        });
    });
    
    
    app.post('/usersByEmail', function (req, res) {
    	user.find( {"email" : req.body.email}, {'groups':true} ,function(err, users) {
            if (err) {
            	res.json({info: 'No users found'});
            }
            console.log("users.. "+users);      
            console.log("length is "+users.length);
            var length = users.length;
            for(i=0; i<length;i++){
            	console.log("group IN IF is "+users[i].groups);
            	group.findById(users[i].groups, function(err, group){
            		console.log("GROUPS ARE "+group.name);
            		if (group) {
		                res.json({info: 'group found successfully', data: group});
		            } else {
		                res.json({info: 'group not found'});
		            }            	
            	});
            }
            
            //res.json({info: 'users found successfully', data: users});               
        });
    });

};
