var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({

    name: String,
    access: Number

});

//  Submitter   1
//  EMT Primary 2
//  EMT Lead    3
//  VP          4
//  Admin       5

module.exports = mongoose.model('Group', groupSchema);