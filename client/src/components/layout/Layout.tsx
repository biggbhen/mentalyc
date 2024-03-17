import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from './Header';

type Props = {};

const Layout = (props: Props) => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};

export default Layout;
