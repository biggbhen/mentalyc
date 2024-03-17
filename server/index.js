require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.use(cors());

app.use(express.json({ extended: false }));

const server = http.createServer(app);

// home route
app.get('/', (req, res) => {
	res.send('API running');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
