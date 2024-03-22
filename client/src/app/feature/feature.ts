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

export const getAllRecords = createAsyncThunk(
	'get/records',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await axios.get(`http://localhost:5000/api/recording`);

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
				`http://localhost:5000/api/recording`,
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
								// Check if the response status is 200 and progress is 100%
								if (percentCompleted === 100) {
									completed = true;
								}
							}
						}, 100); // using interval delay of half a sec
					},
				}
			);

			if (completed && response.data) {
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
				`http://localhost:5000/api/recording?id=${id}`
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
