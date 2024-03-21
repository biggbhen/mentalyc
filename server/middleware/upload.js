const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadPath = path.join(__dirname, '../uploads/'); // the path

		cb(null, uploadPath); // the directory where i am storing the uploaded images
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	// check for file type andreturn response
	if (
		file.mimetype !== 'audio/mp3' ||
		file.mimetype !== 'audio/webm' ||
		file.mimetype !== 'audio/ogg'
	) {
		return cb(null, false, { error: 'Invalid file type' });
	} else {
		cb(null, true);
	}
};

const upload = multer({
	storage,
	fileFilter,
}).single('audio');

module.exports = { upload };
