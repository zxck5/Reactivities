import { configureStore } from "@reduxjs/toolkit";
import { fetchActivities, createActivity, deleteActivity, updateActivity, getActivity } from './slice/Api/ActivitySliceAsyncThunk';
import { activityReducer, setGroupedActivities, setLoading, setSelectedActivity, sortActivitiesBy } from './slice/ActivitySlice';
import { ActivityErrorReducer, setError } from "./slice/ActivityErrorSlice";


const store = configureStore({
    reducer: {
        activity: activityReducer,
        error: ActivityErrorReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['activity/sortActivitiesBy'],
                // Ignore these field paths in all actions
                // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                // ignoredPaths: ['items.dates'],
            },
        }),

});



export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export {
    store,
    fetchActivities,
    createActivity,
    deleteActivity,
    updateActivity,
    getActivity,
    setLoading,
    sortActivitiesBy,
    setGroupedActivities,
    setSelectedActivity,
    setError
}