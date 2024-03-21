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

const upload = multer({
	storage: storage,
});

module.exports = { upload };
