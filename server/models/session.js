const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: 'pending',
	},
	recordUrl: {
		type: String,
		required: true,
	},
	recordId: {
		type: String,
		required: true,
		unique: true,
	},
	recordDuration: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('session', SessionSchema);
