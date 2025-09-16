require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const formData = require('express-form-data');

const app = express();

// Connect Database
connectDB();

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

// initiating middlewares
// Enable Cross-Origin Resource Sharing
app.use(cors(corsOptions));

// express formData()
app.use(formData.parse());

// parse incoming request bodies in JSON format
app.use(express.json({ extended: false }));

const server = http.createServer(app);

app.get('/', (req, res) => {
	res.send('Welcome to Mentalyc...');
});

// Routes
app.use('/api/recording', require('./routes/recording'));

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
	console.log(`Hurray! Our Server is running at port:${PORT}`);
});
