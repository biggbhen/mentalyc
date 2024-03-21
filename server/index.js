require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const { Server } = require('socket.io');
const formData = require('express-form-data');

const app = express();

// Connect Database
connectDB();

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
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

// Create a Socket.IO server with the HTTP server
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

// checking websocket connection between client and server
io.on('connection', (socket) => {
	console.log(socket.id);
	socket.on('send_message', (message) => console.log(message));
});

app.get('/', (req, res) => {
	res.send('Welcome to Mentalyc...');
});

// Routes
app.use('/api/recording', require('./routes/recording'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Hurray! Our Server is running at port:${PORT}`);
});
