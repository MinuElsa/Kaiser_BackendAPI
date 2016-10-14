//var dbJs = require('./db.js');

var mongoose  = require('mongoose');

//Schema for Region
var serviceSchema = mongoose.Schema({
     _id: String,
     parent: String
}, { _id: false });

module.exports = mongoose.model('Services',serviceSchema);