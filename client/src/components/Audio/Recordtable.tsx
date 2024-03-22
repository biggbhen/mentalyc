import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { recordSelector } from '../../app/feature/selector';
import { AppDispatch } from '../../app/store/store';
import {
	deleteRecord,
	getAllRecords,
	resetDeleted,
} from '../../app/feature/feature';
import { Button, Dialog, IconButton, Skeleton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import deleteRecordIcon from '../../assets/3024051.jpg';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#731054',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		width: '150px',
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

export default function RecordTable() {
	const selector = useSelector(recordSelector);
	const dispatch = useDispatch<AppDispatch>();

	const [deleteRecordModal, setDeleteRecordModal] =
		React.useState<boolean>(false);
	const [recordId, setRecordId] = React.useState<string>('');
	React.useEffect(() => {
		dispatch(getAllRecords());
	}, [dispatch]); // Dispatch action when component mounts

	// Memoize data state using useMemo
	const data = React.useMemo(() => {
		// Return recordings data only if it's available and not empty
		if (selector.recordings.length > 0) {
			return selector.recordings;
		}
		// Return an empty array if recordings data is not available
		return [];
	}, [selector.recordings]); // Recompute data state when selector.recordings changes

	// date converter
	const sessionDate = (dateString: string) => {
		const dateObject = new Date(dateString);
		const day = dateObject.getUTCDate();
		const month = dateObject.getUTCMonth() + 1; // Months are zero-indexed, so we add 1
		const year = dateObject.getUTCFullYear();

		return `${day}/${month}/${year}`;
	};

	// toggle delete record modal
	const handleDelete = ({ id }: { id: string }) => {
		setDeleteRecordModal(!deleteRecordModal);
		setRecordId(id);
	};

	// delete recording from database
	const removeItem = (value: string) => {
		dispatch(deleteRecord(value));
		setDeleteRecordModal(false);
		dispatch(resetDeleted(false));
	};

	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell align='center'>Title</StyledTableCell>
							<StyledTableCell align='center'>Duration</StyledTableCell>
							<StyledTableCell align='center'>File</StyledTableCell>
							<StyledTableCell align='center'>Date</StyledTableCell>
							<StyledTableCell align='center'>Status</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.length > 0 ? (
							data.map((item: any) => (
								<StyledTableRow key={item._id}>
									<StyledTableCell
										component='th'
										scope='row'
										sx={{ whiteSpace: 'noWrap' }}>
										{item.name}
									</StyledTableCell>
									<StyledTableCell sx={{ whiteSpace: 'noWrap' }} align='center'>
										{item.title}
									</StyledTableCell>
									<StyledTableCell align='center'>
										{item.recordDuration}
									</StyledTableCell>
									<StyledTableCell align='center'>
										<div className='audio-container'>
											<audio src={item.recordUrl} controls></audio>
										</div>
									</StyledTableCell>
									<StyledTableCell align='center'>
										{sessionDate(item.date)}
									</StyledTableCell>
									<StyledTableCell align='center' sx={{ color: 'green' }}>
										<div className='flex gap-x-[10px] items-center'>
											{item.status}
											<Tooltip title='delete'>
												<IconButton
													sx={{ cursor: 'pointer' }}
													onClick={() => handleDelete({ id: item._id })}>
													<DeleteOutlineIcon sx={{ fontSize: '25px' }} />
												</IconButton>
											</Tooltip>
										</div>
									</StyledTableCell>
								</StyledTableRow>
							))
						) : (
							<StyledTableRow>
								<StyledTableCell
									component='th'
									scope='row'
									sx={{ whiteSpace: 'noWrap' }}>
									<Skeleton variant='rectangular' width={150} height={40} />
								</StyledTableCell>
								<StyledTableCell sx={{ whiteSpace: 'noWrap' }} align='center'>
									<Skeleton variant='rectangular' width={150} height={40} />
								</StyledTableCell>
								<StyledTableCell align='center'>
									<Skeleton variant='rectangular' width={150} height={40} />
								</StyledTableCell>
								<StyledTableCell align='center'>
									<Skeleton variant='rectangular' width={150} height={40} />
								</StyledTableCell>
								<StyledTableCell align='center'>
									<Skeleton variant='rectangular' width={150} height={40} />
								</StyledTableCell>
								<StyledTableCell align='center'>
									<Skeleton variant='rectangular' width={150} height={40} />
								</StyledTableCell>
							</StyledTableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog
				onClose={() => setDeleteRecordModal(false)}
				open={deleteRecordModal}>
				<div className='p-[30px] w-[350px]'>
					<div className='w-[200px] mx-auto'>
						<img src={deleteRecordIcon} alt='icon' />
					</div>
					<p className='text-center mt-6'>delete recording session?</p>
					<div className='flex justify-end gap-x-[1rem] mt-8'>
						<Button
							variant='outlined'
							sx={{
								borderColor: '#731054',
								color: '#731054',
								'&:hover': {
									borderColor: '#731054',
									'&:hover': { backgroundColor: 'transparent' },
								},
							}}
							onClick={() => setDeleteRecordModal(false)}>
							No
						</Button>
						<Button
							variant='contained'
							sx={{
								backgroundColor: '#731054',
								color: 'white',
								'&:hover': { backgroundColor: '#731054' },
							}}
							onClick={() => removeItem(recordId)}>
							Yes
						</Button>
					</div>
				</div>
			</Dialog>
		</div>
	);
}
