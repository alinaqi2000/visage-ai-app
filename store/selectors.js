import { createSelector } from 'reselect';

const getState = state => state;

export const getUser = createSelector(getState, state => state.user);
export const getLoadingState = createSelector(getState, state => state.loadingState);
export const getStatusbarHeight = createSelector(getState, state => state.statusbarHeight);
export const getTimeline = createSelector(getState, state => state.timeline);
