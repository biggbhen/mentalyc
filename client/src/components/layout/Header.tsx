import React from 'react';
import { MdNotifications } from 'react-icons/md';
import { Link } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
	return (
		<header className='fixed left-0 top-0 right-0 pl-[250px] pr-[40px] z-30 bg-white shadow-sm min-h-[80px] flex items-center '>
			<div className='flex items-center justify-between w-full'>
				<Link to='/' className='text-[1.5rem] font-bold text-[#DF0B6F]'>
					Mentalyc
				</Link>
				<MdNotifications size={25} color='#DF0B6F' className='cursor-pointer' />
			</div>
		</header>
	);
};

export default Header;
