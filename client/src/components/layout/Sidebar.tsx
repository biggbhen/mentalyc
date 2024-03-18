import React from 'react';
import RoundLogo from '../../assets/Mentalyc-Logo-round.png';
import { MdDashboard } from 'react-icons/md';
import { MdFolderCopy } from 'react-icons/md';
import handIcon from '../../assets/waving-hand.png';

type Props = {};

const Sidebar = (props: Props) => {
	return (
		<div className='fixed top-0 bottom-0 w-[200px] shadow-md z-40 bg-white py-[20px]'>
			<figure className='flex justify-center'>
				<img src={RoundLogo} alt='icon' className='rounded-full w-[70px]' />
			</figure>
			<h2 className='mt-[0.5rem] text-[#DF0B6F] flex items-center justify-center gap-[10px]'>
				Hi John
				<img src={handIcon} alt='icon' className='w-[25px]' />
			</h2>
			<ul className='mt-[2.5rem] min-h-[50px] py-[30px]'>
				<li className='flex gap-x-[1rem] items-center justify-center border-r-[2px] border-r-[red] text-sm mb-[1rem] py-[10px] hover:bg-[#FFF0F7] cursor-pointer'>
					<MdDashboard size={20} />
					Dashboard
				</li>
				<li className='flex gap-x-[1rem] items-center justify-center text-sm py-[10px] hover:bg-[#FFF0F7] cursor-pointer'>
					<MdFolderCopy size={20} />
					Recordings
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
