import { configureStore } from "@reduxjs/toolkit";
import { fetchActivities, createActivity, deleteActivity, updateActivity, getActivity } from './slice/Api/ActivitySliceAsyncThunk';
import { activityReducer, setGroupedActivities, setLoading, setSelectedActivity, sortActivitiesBy } from './slice/ActivitySlice';
import { setUser, accountReducer, logout } from "./slice/AccountSlice";
import { commonReducer, setAppLoaded, setServerError } from "./slice/CommonSlice";
import { getCurrentUserAsyncThunk, loginUserAsyncThunk, registerUserAsyncThunk } from "./slice/Api/AccountSliceAsyncThunk";
import { closeModal, modalReducer, openModal } from "./slice/ModalSlice";


const store = configureStore({
    reducer: {
        common: commonReducer,
        activity: activityReducer,
        account: accountReducer,
        modal: modalReducer
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

//common
export {
    store,
    setServerError,
    setAppLoaded
}
// account
export {
    setUser,
    logout,
    getCurrentUserAsyncThunk,
    registerUserAsyncThunk,
    loginUserAsyncThunk
}

// activities
export {
    fetchActivities,
    createActivity,
    deleteActivity,
    updateActivity,
    getActivity,
    setLoading,
    sortActivitiesBy,
    setGroupedActivities,
    setSelectedActivity,
}

// modal
export {
    openModal,
    closeModal
}