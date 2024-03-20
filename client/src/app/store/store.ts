import { configureStore } from '@reduxjs/toolkit';
import recordReducer from '../feature/feature';

const store: any = configureStore({
	reducer: {
		record: recordReducer,
	},
});

export default store;
export type AppDispatch = typeof store.dispatch;
