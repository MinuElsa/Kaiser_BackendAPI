var _ = require('lodash');
var region = require('../models/region.js');
var mw = require('../middleware/index.js');

module.exports = function(app) {

    /* Create */
    app.post('/regions', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        var newregion = new region(req.body);
		        newregion.save(function(err) {
		            if (err) {
		                res.json({info: 'error during region create', error: err});
		            };
		            res.json({info: 'region created successfully'});
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    /* Read */
    app.get('/regions', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        region.find(function(err, regions) {
		            if (err) {
		                res.json({info: 'error during find regions', error: err});
		            };
		            res.json({info: 'regions found successfully', data: regions});
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    app.get('/regions/:id', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        region.findById(req.params.id, function(err, region) {
		            if (err) {
		                res.json({info: 'error during find region', error: err});
		            };
		            if (region) {
		                res.json({info: 'region found successfully', data: region});
		            } else {
		                res.json({info: 'region not found'});
		            }
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    /* Update */
    app.put('/regions/:id', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        region.findById(req.params.id, function(err, region) {
		            if (err) {
		                res.json({info: 'error during find region', error: err});
		            };
		            if (region) {
		                _.merge(region, req.body);
		                region.save(function(err) {
		                    if (err) {
		                        res.json({info: 'error during region update', error: err});
		                    };
		                    res.json({info: 'region updated successfully'});
		                });
		            } else {
		                res.json({info: 'region not found'});
		            }
		
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    /* Delete */
    app.delete('/regions/:id', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        region.findByIdAndRemove(req.params.id, function(err) {
		            if (err) {
		                res.json({info: 'error during remove region', error: err});
		            };
		            res.json({info: 'region removed successfully'});
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

};
