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
			const response = await axios.get(`localhost:5000/api/recording`);

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
				state.recordings = action.payload;
				state.loading = false;
			})
			.addCase(getAllRecords.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// export const { } = featureSlice.actions;
export default recordSlice.reducer;
