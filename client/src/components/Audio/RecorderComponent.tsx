import { Button, IconButton, Tooltip } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recordSelector } from '../../app/feature/selector';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { AppDispatch } from '../../app/store/store';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { toast } from 'react-toastify';
import { CreateNewRecord } from '../../app/feature/feature';

type Props = {
	handleModalClose: () => void;
};

const AudioRecorder: React.FC<Props> = ({ handleModalClose }) => {
	const selector = useSelector(recordSelector);
	const dispatch = useDispatch<AppDispatch>();
	const audioRef = useRef<HTMLAudioElement>(null);

	const [permission, setPermission] = useState<boolean>(false);
	const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [recordingStatus, setRecordingStatus] = useState<string>('inactive');
	const [audio, setAudio] = useState<string>('');
	const [audioFile, setAudioFile] = useState<Blob | null>(null);
	const [audioChunks, setAudioChunks] = useState<any>([]);
	const [startTime, setStartTime] = useState<number | null>(null);
	const [duration, setDuration] = useState<string | null>(null);
	const [formItem, setFormItem] = useState<any>({});

	// Get Microphone Permissions
	const getMicrophonePermission = async () => {
		if ('MediaRecorder' in window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setPermission(true);
				setStream(streamData);
			} catch (err: any) {
				alert(err.message);
			}
		} else {
			alert('The MediaRecorder API is not supported in your browser.');
		}

		if (permission) {
			toast.success('mic permission granted');
		}
	};

	// start audio recording
	const startRecording = async () => {
		if (formItem.name && formItem.title) {
			getMicrophonePermission();
			setRecordingStatus('recording');
			setStartTime(Date.now());

			// Check if stream is not null before proceeding
			if (stream) {
				try {
					let localAudioChunks: Blob[] = [];
					// Create new Media recorder instance using the stream
					const mediaRecorderInstance = new MediaRecorder(stream, {
						mimeType: 'audio/webm',
					});

					mediaRecorderInstance.ondataavailable = (event: BlobEvent) => {
						if (event.data && event.data.size > 0) {
							localAudioChunks.push(event.data);
						}
					};

					mediaRecorderInstance.onstop = () => {
						const audioBlob = new Blob(localAudioChunks, {
							type: 'audio/ogg; codec=opus',
						});
						setAudioFile(audioBlob);
						const audioUrl = URL.createObjectURL(audioBlob);
						setAudio(audioUrl);
						stream.getTracks().forEach(function (track) {
							track.stop();
						});
					};

					// Invokes the start method to start the recording process
					mediaRecorderInstance.start();
					setRecorder(mediaRecorderInstance);
					setAudioChunks(localAudioChunks);
				} catch (error) {
					console.error('Error starting recording:', error);
				}
			} else {
				getMicrophonePermission();
				console.error('Stream is null. Cannot start recording.');
			}
		} else {
			toast.error('fill empty fields');
		}
	};

	// stop audio recording
	const stopRecording = async () => {
		if (startTime) {
			const endTime = Date.now();
			const recordingDuration = endTime - startTime;

			const minutes = Math.floor(recordingDuration / (1000 * 60));
			const seconds = Math.floor((recordingDuration % (1000 * 60)) / 1000);

			setDuration(`${minutes}m ${seconds}s`);
			setRecordingStatus('stopped');
		}
		// Check if recorder is not null before proceeding
		if (recorder) {
			//stops the recording instance
			recorder.stop();
		} else {
			console.error('Stream is null.');
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormItem({
			...formItem,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = () => {
		if (audioRef.current && formItem.name && formItem.title) {
			const newSession = {
				...formItem,
				audio: audioFile,
				duration: duration,
			};
			// create key - value pairs by appending newSession object to the FormData object
			const formData = new FormData();
			formData.append('name', newSession.name);
			formData.append('title', newSession.title);
			formData.append('audio', newSession.audio);
			formData.append('duration', newSession.duration);

			dispatch(CreateNewRecord(formData));
		} else {
			toast.warning('Fill and attach all fields');
		}
	};

	React.useEffect(() => {
		getMicrophonePermission();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='p-[20px] w-[500px]'>
			<h2 className='mb-8 font-semibold'>Record a new session</h2>
			{/* form */}
			<form className=''>
				<div className='mb-[1rem]'>
					<label htmlFor='name' className='text-sm block mb-[5px]'>
						Client Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						className='border border-[#E6E7EB] w-full p-2 rounded-[6px]'
						onChange={handleChange}
						value={formItem.name}
					/>
				</div>
				<div>
					<label htmlFor='title' className='text-sm block'>
						Session Title
					</label>
					<input
						type='text'
						id='title'
						name='title'
						className='border border-[#E6E7EB] w-full p-2 rounded-[6px]'
						onChange={handleChange}
						value={formItem.title}
					/>
				</div>

				<div className='flex justify-between mt-8'>
					<div className=''>
						{recordingStatus === 'recording' ? (
							<Tooltip title='stop'>
								<IconButton sx={{ cursor: 'pointer' }} onClick={stopRecording}>
									<StopCircleIcon sx={{ fontSize: '3rem', color: '#731054' }} />
								</IconButton>
							</Tooltip>
						) : (
							<Tooltip title='play'>
								<IconButton sx={{ cursor: 'pointer' }} onClick={startRecording}>
									<RadioButtonCheckedIcon
										sx={{ fontSize: '3rem', color: '#731054' }}
									/>
								</IconButton>
							</Tooltip>
						)}
					</div>

					<div className='flex items-center gap-x-[10px]'>
						{recordingStatus === 'stopped' ? (
							<div className='audio-container'>
								<audio src={audio} controls ref={audioRef}></audio>
							</div>
						) : recordingStatus === 'recording' ? (
							<p className='text-sm'>recording...</p>
						) : (
							<p className='text-sm'>
								Click on the record button to start recording
							</p>
						)}
						<div className='rounded-full bg-[#731054] flex justify-center items-center w-[50px] h-[50px]'>
							{recordingStatus === 'recording' ? (
								<MicIcon sx={{ fontSize: '1.2rem', color: 'white' }} />
							) : (
								<MicOffIcon sx={{ fontSize: '1.2rem', color: 'white' }} />
							)}
						</div>
					</div>
				</div>

				<div className='mt-8 flex justify-end gap-x-[1rem]'>
					<Button
						onClick={handleModalClose}
						variant='outlined'
						sx={{
							color: '#731054',
							borderColor: '#731054',
							textTransform: 'none',
						}}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						variant='contained'
						sx={{
							color: 'white',
							backgroundColor: '#731054',
							'&:hover': {
								backgroundColor: '#731054',
							},
							textTransform: 'none',
						}}>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AudioRecorder;
