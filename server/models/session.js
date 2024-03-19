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
	uploadStatus: {
		type: Number,
		default: 0,
	},
	recordName: {
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
	recordUrl: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
