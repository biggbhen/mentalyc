const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const SessionSchema = require('../models/session');

// @route     GET api/recording
// @desc      get all audio recordings
// @access    public
router.get('/', async (req, res) => {
	try {
		const session = await SessionSchema.find();

		if (session) {
			res.status(200).json({
				status: 'success',
				data: {
					data: session,
				},
				message: 'records retrived successfully',
			});
		} else {
			res.status(404).json({
				status: 'failed',
				data: {
					data: [],
				},
				message: 'No records found',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route     POST api/recording
// @desc      create new audio recording
// @access    public
// router.post('/', upload.single('audio'), async (req, res) => {
// 	try {
// 		console.log(req);
// 		const { name, title, duration } = req.body;

// 		const audioFile = req.file;

// 		const recordId = uuidv4();

// 		const io = req.io;

// 		const newSession = new SessionSchema({
// 			name: name,
// 			title: title,
// 			recordName: audioFile,
// 			recordId: recordId,
// 			recordDuration: duration,
// 			status: 'done',
// 		});

// 		const session = await newSession.save();

// 		if (session) {
// 			res.status(201).json({
// 				status: 'success',
// 				data: session,
// 				message: 'Record saved successfully.',
// 			});
// 		} else {
// 			res.status(404).json({
// 				status: 'error',
// 				error: {
// 					message: 'Failed to save record.',
// 					details: 'An error occurred while processing the request.',
// 				},
// 			});
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send('Server Error');
// 	}
// });

router.post('/', async (req, res) => {
	try {
		const { name, title, duration } = req.body;

		const audioFile = req.files;

		const audioId = uuidv4();

		const io = req.io;

		const newSession = new SessionSchema({
			name: name,
			title: title,
			recordName: audioFile.audio.originalFilename,
			recordId: audioId,
			recordDuration: duration,
			status: 'saved',
		});

		const savedSession = await newSession.save();

		if (savedSession) {
			res.status(201).json({
				status: 'success',
				data: savedSession,
				message: 'Session saved successfully.',
			});

			// await uploadAudio(audioId, audioFile.buffer, savedSession.id, io);
		} else {
			res.status(500).json({
				status: 'error',
				error: {
					message: 'Failed to save the session.',
					details: 'An error occurred while processing the request.',
				},
			});
		}
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

module.exports = router;
