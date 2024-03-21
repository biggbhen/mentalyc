import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { io } from 'socket.io-client';
import RecordList from './pages/RecordList';

function App() {
	const socket = io('http://localhost:5000');

	// test remote copnnection between server and client
	React.useEffect(() => {
		socket.emit('send_message', { message: 'socket is sooo connected' });
		// eslint-disable-next-line
	}, []);

	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='/recordings' element={<RecordList />} />
			</Route>
		</Routes>
	);
}

export default App;
