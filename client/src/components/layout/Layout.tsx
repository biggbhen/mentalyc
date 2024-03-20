import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = {};

const Layout = (props: Props) => {
	return (
		<div>
			<Header />
			<Sidebar />
			<div className='pl-[250px] mt-[80px] pr-[50px]'>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
