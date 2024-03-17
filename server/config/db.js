const mongoose = require('mongoose');
const db = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(db);
		console.log('mongodb connected...');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
