import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface RootState {
	loading: boolean;
	error: any;
	recordings: any;
}

const initialState: RootState = {
	loading: true,
	error: null,
	recordings: [],
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
	async (formData: FormData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`http://localhost:5000/api/recording`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			if (response.status && response.status === 200) {
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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllRecords.pending, (state, action: PayloadAction<any>) => {
				state.loading = true;
			})
			.addCase(getAllRecords.fulfilled, (state, action: PayloadAction<any>) => {
				// state.recordings = action.payload;
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
					// state.recordings = action.payload;
					state.loading = false;
					console.log(action.payload);
				}
			)
			.addCase(
				CreateNewRecord.rejected,
				(state, action: PayloadAction<any>) => {
					state.loading = false;
					state.error = action.payload;
				}
			);
	},
});

// export const { } = featureSlice.actions;
export default recordSlice.reducer;
