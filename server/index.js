require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const { Server } = require('socket.io');

const app = express();

// Connect Database
connectDB();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// parse incoming request bodies in JSON format
app.use(express.json({ extended: false }));

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log(socket.id);
	socket.on('send_message', (message) => console.log(message));
});

// home route
app.get('/', (req, res) => {
	res.send('API running');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Hurray! Our Server is running at port:${PORT}`);
});
