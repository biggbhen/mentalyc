import React, { useState } from 'react';
import AudioRecorder from '../components/Audio/RecorderComponent';
import waveIcon from '../assets/waving-hand.png';
import micIcon from '../assets/mic-01.svg';
import { Button, Dialog } from '@mui/material';
import RecordTable from '../components/Audio/Recordtable';

type Props = {};

const Home: React.FC<Props> = () => {
	const [open, setOpen] = useState<boolean>(false);

	const handleRecording = () => setOpen(!open);

	const handleClose = (
		event: {},
		reason: 'backdropClick' | 'escapeKeyDown'
	) => {
		if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
			// Handle close event here
			setOpen(false);
		}
	};

	const handleModalClose = () => setOpen(false);

	return (
		<div className='my-8'>
			<div className='min-h-[150px] max-w-[100%] w-[1100px] mx-auto'>
				<div>
					<h1 className='flex items-center gap-x-[10px] text-[1.5rem]'>
						Hi Georgi <img src={waveIcon} className='w-[30px]' alt='icon' />{' '}
					</h1>
					<p className='my-[1rem] text-[1.3rem]'>
						Would you like to record a session today?
					</p>
					<p className='font-light'>
						Kindly ensure you are in a quiet environment and to have a more
						effective recording, you can make use of a microphone.
					</p>
					<p className='font-light'>
						Click on the button below to start recording a session when you are
						ready.
					</p>
					<div className='mt-[2rem] flex justify-center'>
						<Button
							variant='contained'
							sx={{
								display: 'flex',
								alignItems: 'center',
								columnGap: '10px',
								color: 'white',
								backgroundColor: '#731054',
								'&:hover': {
									backgroundColor: '#731054',
								},
								textTransform: 'none',
							}}
							size='large'
							onClick={handleRecording}>
							Start Recording <img src={micIcon} alt='icon' />
						</Button>
					</div>
				</div>
			</div>
			<div className='mt-12 max-w-[100%] w-[1100px] mx-auto'>
				<RecordTable />
			</div>
			<Dialog onClose={handleClose} open={open}>
				<AudioRecorder handleModalClose={handleModalClose} />
			</Dialog>
		</div>
	);
};

export default Home;
