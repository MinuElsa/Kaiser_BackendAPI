var _ = require('lodash');
var Project = require('../models/project.js');
var mw = require('../middleware/index.js');
var request = require('request');

module.exports = function(app) {

    /* Create */
    app.post('/projects', function (req, res) {
    	console.log("Going to post projects....");
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        var newProject = new Project(req.body);
		        newProject.save(function(err) {
		            if (err) {
		                res.json({info: 'error during project create', error: err});
		            };
					//res.setHeader('Content-Type','application/json');            
		            res.json({info: 'project created successfully'});
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    /* Read */
    app.get('/projects', function (req, res) {
    	console.log("GOING TO GET PROJECTS!!!");    	
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		console.log("==== response emailid:"+response.email);
    		console.log("=== userProf groups:"+response.groups[0]);
    		console.log("=== userProf groups:"+response.groups[1]);
    		if(response != null){
    			var recvdgroupName;
    			var request = require('request');
    			var requestURL = "http://localhost:6003" + "/groups/" +response.groups[0];
    			request({
    				url: requestURL,
    				method: 'GET'
    			}, function (error, response, body) {
    				console.log(" GOT THE GROUPS "+response+" "+body);    				
    				var jsonData = JSON.parse(body);
    				console.log(jsonData);
    				console.log(jsonData.data.name);
    				    				
    				recvdgroupName = jsonData.data.access;
    				console.log("==== recvdgroupName"+recvdgroupName);
    				
    				console.log("I AM HERE");
        			switch(recvdgroupName)
        			{
        			case 5:
        				console.log("====Admin part=====");
    		    		Project.find(function(err, projects) {
    		                if (err) {
    		                	res.json({info: 'No projects found'});
    		                }
    		                res.json({info: 'projects found successfully', data: projects});	                
    		            });
        			    break;
        			default:
        				console.log("====NOT Admin part=====");  
        			}
        			
    			});
    			
    			
    			
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	
    	});	
         
    });

    app.get('/projects/:id', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        Project.findById(req.params.id, function(err, project) {
		            if (err) {
		                res.json({info: 'error during find project', error: err});
		            };
		            if (project) {
		                res.json({info: 'project found successfully', data: project});
		            } else {
		                res.json({info: 'project not found'});
		            }
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    /* Update */
    app.put('/projects/:id', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        Project.findById(req.params.id, function(err, project) {
		            if (err) {
		                res.json({info: 'error during find project', error: err});
		            };
		            if (project) {
		                _.merge(project, req.body);
		                project.save(function(err) {
		                    if (err) {
		                        res.json({info: 'error during project update', error: err});
		                    };
		                    res.json({info: 'project updated successfully'});
		                });
		            } else {
		                res.json({info: 'project not found'});
		            }
		
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    /* Delete */
    app.delete('/projects/:id', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        Project.findByIdAndRemove(req.params.id, function(err) {
		            if (err) {
		                res.json({info: 'error during remove project', error: err});
		            };
		            res.json({info: 'project removed successfully'});
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });


};
