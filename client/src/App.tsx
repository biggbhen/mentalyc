import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import RecordList from './pages/RecordList';

function App() {
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
