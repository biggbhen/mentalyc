import React from 'react';
import RoundLogo from '../../assets/Mentalyc _logo.svg';
import recordIcon from '../../assets/voice.svg';
import recordListIcon from '../../assets/menu-square.svg';
import settingsIcon from '../../assets/setting-02.svg';
import helpIcon from '../../assets/help-circle.svg';
import { Link } from 'react-router-dom';

type Props = {};

const Sidebar = (props: Props) => {
	return (
		<div className='fixed top-0 bottom-0 w-[200px] shadow-md z-40 bg-[#FAFAFA] pt-[50px] pb-[20px] flex items-center flex-col'>
			<figure className=''>
				<img src={RoundLogo} alt='icon' className='rounded-full w-[70px]' />
			</figure>
			<ul className='mt-[2.5rem] py-[30px] w-max flex flex-col gap-y-[1rem]'>
				<li>
					<Link
						to='/'
						className='flex gap-x-[10px] items-center text-sm py-[10px] hover:bg-[#FFF0F7] cursor-pointer'>
						<img src={recordIcon} alt='icon' />
						Record
					</Link>
				</li>
				<li>
					<Link
						to='/recordings'
						className='flex gap-x-[10px] items-center text-sm py-[10px] hover:bg-[#FFF0F7] cursor-pointer'>
						<img src={recordListIcon} alt='icon' />
						Recordings List
					</Link>
				</li>
				<li className='flex gap-x-[10px] items-center text-sm py-[10px] hover:bg-[#FFF0F7] cursor-pointer'>
					<img src={settingsIcon} alt='icon' />
					Settings
				</li>
				<li className='flex gap-x-[10px] items-center text-sm py-[10px] hover:bg-[#FFF0F7] cursor-pointer'>
					<img src={helpIcon} alt='icon' />
					Help
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
