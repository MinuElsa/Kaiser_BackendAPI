var _ = require('lodash');
var group = require('../models/group.js');

module.exports = function(app) {

    /* Create */
    app.post('/groups', function (req, res) {
        var newgroup = new group(req.body);
        newgroup.save(function(err) {
            if (err) {
                res.json({info: 'error during group create', error: err});
            };
            res.json({info: 'group created successfully'});
        });
    });

    /* Read */
    app.get('/groups', function (req, res) {
    	console.log("GOING TO GET GROUPS!!!!");
        group.find(function(err, groups) {
            if (err) {
                res.json({info: 'error during find groups', error: err});
            };
            res.json({info: 'groups found successfully', data: groups});
        });
    });

    app.get('/groups/:id', function (req, res) {
    	console.log("Going to get groups by id "+req.params.id);
        group.findById(req.params.id, function(err, group) {
        	console.log("err is "+err);
        	console.log("group is "+group);
            if (err) {
                res.json({info: 'error during find group', error: err});
            };
            if (group) {
                res.json({info: 'group found successfully', data: group});
            } else {
                res.json({info: 'group not found'});
            }
        });
    });

    /* Update */
    app.put('/groups/:id', function (req, res) {
        group.findById(req.params.id, function(err, group) {
            if (err) {
                res.json({info: 'error during find group', error: err});
            };
            if (group) {
                _.merge(group, req.body);
                group.save(function(err) {
                    if (err) {
                        res.json({info: 'error during group update', error: err});
                    };
                    res.json({info: 'group updated successfully'});
                });
            } else {
                res.json({info: 'group not found'});
            }

        });
    });

    /* Delete */
    app.delete('/groups/:id', function (req, res) {
        group.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove group', error: err});
            };
            res.json({info: 'group removed successfully'});
        });
    });

};
