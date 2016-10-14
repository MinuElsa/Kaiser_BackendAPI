var _ = require('lodash');
var service = require('../models/service.js');

module.exports = function(app) {

    /* Create */
    app.post('/services', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        var newservice = new service(req.body);
		        newservice.save(function(err) {
		            if (err) {
		                res.json({info: 'error during service create', error: err});
		            };
		            res.json({info: 'service created successfully'});
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    /* Read */
    app.get('/services', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        service.find(function(err, services) {
		            if (err) {
		                res.json({info: 'error during find services', error: err});
		            };
		            res.json({info: 'services found successfully', data: services});
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    app.get('/services/:id', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        service.findById(req.params.id, function(err, service) {
		            if (err) {
		                res.json({info: 'error during find service', error: err});
		            };
		            if (service) {
		                res.json({info: 'service found successfully', data: service});
		            } else {
		                res.json({info: 'service not found'});
		            }
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    /* Update */
    app.put('/services/:id', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        service.findById(req.params.id, function(err, service) {
		            if (err) {
		                res.json({info: 'error during find service', error: err});
		            };
		            if (service) {
		                _.merge(service, req.body);
		                service.save(function(err) {
		                    if (err) {
		                        res.json({info: 'error during service update', error: err});
		                    };
		                    res.json({info: 'service updated successfully'});
		                });
		            } else {
		                res.json({info: 'service not found'});
		            }
		
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

    /* Delete */
    app.delete('/services/:id', function (req, res) {
    	mw.verifyToken(req, function(request,response){
    		console.log("==== response"+response);
    		if(response){
		        service.findByIdAndRemove(req.params.id, function(err) {
		            if (err) {
		                res.json({info: 'error during remove service', error: err});
		            };
		            res.json({info: 'service removed successfully'});
		        });
    		}else{
    			//Need to handle the errors for different cases : Invalid token, invalid user etc.
    			res.json({info: 'Session Expired'});
    		}
    	});
    });

};
