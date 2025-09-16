import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface RootState {
	loading: boolean;
	error: any;
	recordings: any;
	recording: any;
	created: boolean;
	deleted: boolean;
	percentCompleted: number;
}

const initialState: RootState = {
	loading: true,
	error: null,
	recordings: [],
	recording: [],
	created: false,
	deleted: false,
	percentCompleted: 0,
};
const getBaseUrl = () => {
	if (window.location.hostname !== 'localhost') {
		return `https://mentalyc-fbn7.onrender.com`;
	} else {
		return `http://localhost:5001`;
	}
};

export const getAllRecords = createAsyncThunk(
	'get/records',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${getBaseUrl()}/api/recording`);

			if (response.status && response.status === 200) {
				return response.data;
			}

			return rejectWithValue(response.data);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const CreateNewRecord = createAsyncThunk(
	'create/records',
	async (formData: FormData, { rejectWithValue, dispatch }) => {
		try {
			let completed = false;
			const response = await axios.post(
				`${getBaseUrl()}/api/recording`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
					onUploadProgress: function (progressEvent: any) {
						const totalSize = progressEvent.total;
						let uploaded = 0;

						const interval = setInterval(() => {
							uploaded += 5000; // Simulate upload progress by increasing uploaded size

							// Ensure uploaded doesn't exceed totalSize
							uploaded = Math.min(uploaded, totalSize);

							const percentCompleted = Math.round((uploaded * 100) / totalSize);

							// Dispatch an action here to update the state with percentCompleted
							dispatch(updateProgress(percentCompleted));

							if (uploaded >= totalSize) {
								clearInterval(interval); // Stop the interval when upload is complete
								// Check if the progress is 100%
								if (percentCompleted === 100) {
									completed = true;
								}
							}
						}, 100);
					},
				}
			);

			// Wait until the upload is completed (progress reaches 100%)
			while (!completed) {
				await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms
			}

			if (response.status === 200 || response.status === 201) {
				return response.data;
			}

			return rejectWithValue(response.data);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteRecord = createAsyncThunk(
	'delete/records',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${getBaseUrl()}/api/recording?id=${id}`
			);

			if (
				(response.status && response.status === 200) ||
				response.status === 201
			) {
				return response.data;
			}

			return rejectWithValue(response.data);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const recordSlice = createSlice({
	name: 'record',
	initialState,
	reducers: {
		resetCreated: (state, action: PayloadAction<any>) => {
			state.created = action.payload;
		},
		resetDeleted: (state, action: PayloadAction<any>) => {
			state.deleted = action.payload;
		},
		updateProgress(state, action: PayloadAction<any>) {
			state.percentCompleted = action.payload;
		},
		resetUpdateProgress(state, action: PayloadAction<any>) {
			state.percentCompleted = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllRecords.pending, (state, action: PayloadAction<any>) => {
				state.loading = true;
			})
			.addCase(getAllRecords.fulfilled, (state, action: PayloadAction<any>) => {
				state.recordings = action.payload.data.data;
				state.loading = false;
			})
			.addCase(getAllRecords.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(CreateNewRecord.pending, (state, action: PayloadAction<any>) => {
				state.loading = true;
			})
			.addCase(
				CreateNewRecord.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.recording = action.payload.data.data;
					state.loading = false;
					state.created = true;
					toast.success('new record was created');
				}
			)
			.addCase(
				CreateNewRecord.rejected,
				(state, action: PayloadAction<any>) => {
					state.loading = false;
					state.error = action.payload;
				}
			)
			.addCase(deleteRecord.pending, (state, action: PayloadAction<any>) => {
				state.loading = true;
			})
			.addCase(deleteRecord.fulfilled, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.deleted = true;
				toast.success('record was deleted successfully');
			})
			.addCase(deleteRecord.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const {
	resetCreated,
	resetDeleted,
	updateProgress,
	resetUpdateProgress,
} = recordSlice.actions;
export default recordSlice.reducer;
