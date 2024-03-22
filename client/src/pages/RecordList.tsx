import React from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import waveIcon from '../assets/waving-hand.png';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import RecordTable from '../components/Audio/Recordtable';
import { AppDispatch } from '../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { recordSelector } from '../app/feature/selector';
import {
	getAllRecords,
	resetCreated,
	resetDeleted,
} from '../app/feature/feature';
import NoDataImg from '../assets/3545798.jpg';

type Props = {};

const RecordList = (props: Props) => {
	const selector = useSelector(recordSelector);
	const dispatch = useDispatch<AppDispatch>();

	const handleClick = () => {
		toast.info('coming soon');
	};

	React.useEffect(() => {
		if (selector.created === true) {
			dispatch(getAllRecords());
			dispatch(resetCreated(false));
		}
		if (selector.deleted === true) {
			dispatch(getAllRecords());
			dispatch(resetDeleted(false));
		}
		// eslint-disable-next-line
	}, [selector.created, selector.deleted]);

	return (
		<div>
			<div className='min-h-[150px] max-w-[100%] w-[1100px] mx-auto'>
				<div>
					<h1 className='flex items-center gap-x-[10px] text-[1.5rem]'>
						Hi Georgi <img src={waveIcon} className='w-[30px]' alt='icon' />{' '}
					</h1>
					<p className='my-[1rem] text-[1.3rem]'>
						Dive into your audio recordings List!
					</p>
					<p className='font-light'>
						You can now generate notes from your sessions recordings, dope
						right?
					</p>
					<p className='font-light'>
						Click on the button below to Generate notes from your sessions.
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
							onClick={handleClick}>
							Generate Notes <TextSnippetIcon />
						</Button>
					</div>
				</div>

				<div className='mt-12 max-w-[100%] w-[1100px] mx-auto'>
					{selector.recordings.length === 0 &&
					selector.loading !== 'pending' ? (
						<div className='mt-12 w-[600px] mx-auto'>
							<img src={NoDataImg} alt='stateless' />
						</div>
					) : (
						<div className='mt-12 max-w-[100%] w-[1100px] mx-auto'>
							<RecordTable />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RecordList;
