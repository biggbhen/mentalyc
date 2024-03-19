import { Button } from '@mui/material';
import React, { useState, useRef } from 'react';

type Props = {};

const AudioRecorder: React.FC<Props> = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [permission, setPermission] = useState<boolean>(false);
	const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [recordingStatus, setRecordingStatus] = useState<string>('inactive');
	const [audio, setAudio] = useState<string>('');
	const [audioChunks, setAudioChunks] = useState<any>([]);
	const [audioDuration, setAudioDuration] = useState<number | undefined>(0);

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
	};

	// start audio recording
	const startRecording = async () => {
		setRecordingStatus('recording');

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
	};

	// end audio recording
	const stopRecording = async () => {
		setRecordingStatus('inactive');
		// Check if recorder is not null before proceeding
		if (recorder) {
			//stops the recording instance
			recorder.stop();
		} else {
			console.error('Stream is null.');
		}
	};

	console.log(audioRef?.current?.duration);
	return (
		<div>
			<Button variant='contained' onClick={getMicrophonePermission}>
				Handle Permission
			</Button>
			<Button variant='contained' onClick={startRecording}>
				Handle Record
			</Button>
			<Button variant='contained' onClick={stopRecording}>
				stop Record
			</Button>

			<div className='audio-container'>
				<audio src={audio} controls ref={audioRef}></audio>
				<a download href={audio}>
					Download Recording
				</a>
			</div>
		</div>
	);
};

export default AudioRecorder;
