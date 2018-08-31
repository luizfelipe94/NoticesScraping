var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noticeSchema = Schema({
	title: {type: String, required: true},
	dateNotice: String,
	bodyNotice: String
});

module.exports = mongoose.model('Notice', noticeSchema);