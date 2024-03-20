import { createSelector } from 'reselect';

// feature Selector
export const feat = (state: { record: any }) => state.record;
export const recordSelector = createSelector(feat, (state) => state);
