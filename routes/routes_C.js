/**
 * http://usejsdoc.org/
 */

var router = require('express').Router();

var routeUserAuthenticate = require('./routeUserAuthentication');
var routeUserAuth = require('./routeUserAuthorization');
var routeProject = require('./routeProjects');

router.post('/projects',routeProject.createProject);
router.get('/projects',routeProject.getAllProjects);
router.get('/projects/:id',routeProject.getProjectById);
router.put('/projects/:id',routeProject.putProjectById);

router.post('/authenticate',routeUserAuthenticate.authenticate);

module.exports = router;
