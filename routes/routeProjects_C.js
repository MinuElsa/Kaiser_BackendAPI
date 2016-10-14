/**
 * http://usejsdoc.org/
 */

var Project = require("../models/project.js");


	exports.createProject = function createProject(req,res){	
		console.log("CREATE Project"); 
		var newProject = new Project(req.body);
	    newProject.save(function(err) {
	        if (err) {
	            res.json({info: 'error during project create', error: err});
	        };
			res.setHeader('Content-Type','application/json');
	        res.json({info: 'project created successfully'});
	    });
	    //res.status(200).json({'message':'success'});
	};

	exports.getAllProjects = function getAllProjects(req,res){ 
	    console.log("get all PROJECTS req receieved"); 
	    Project.find(function(err, projects) {	
	        if (err) {
	            res.json({info: 'error during find projects', error: err});
	        };
			res.setHeader('Content-Type','application/json');
	        res.json({info: 'projects found successfully', data: projects});
	    });
	    //res.status(200).json({'message':'success'});
	};
	
	exports.getProjectById = function getProjectById(req, res) {
		console.log("get PROJECT BY ID req receieved");
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
	};
	
	exports.putProjectById = function putProjectById(req, res) {
		console.log("get PUT PROJECT req receieved");
		Project.findById(req.params.id, function(err, project) {
            if (err) {
                res.json({info: 'error during find project', error: err});
            };
            console.log("project is "+project);
            if (project) {
            	console.log("Going to merge...."+req.body);
                _.merge(project, req.body);
                console.log("Merge done..");
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
	};