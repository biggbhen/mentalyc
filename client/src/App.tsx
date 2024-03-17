import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { io } from 'socket.io-client';

function App() {
	const socket = io('http://localhost:5000');

	// requesting access to the user's media devices on app mount
	React.useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: false, audio: true })
			.then((media) => {
				console.log('audio device allowed');
			})
			.catch((err) => {
				console.log(`error message: ${err}`);
			});
	}, []);

	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
}

export default App;
