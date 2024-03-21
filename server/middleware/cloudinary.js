const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'doxnoyc3j',
	api_key: '118832584362895',
	api_secret: 'crQWEUtqwmxzxjp4WzDlCjYTf6s',
	secure: true,
});

module.exports = cloudinary;
