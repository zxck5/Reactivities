import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../../app/models/activity';
import { createActivity, fetchActivities, deleteActivity, updateActivity } from './Api/ActivitySliceAsyncThunk';

interface ActivityState {
    data: Activity[],
    loading: boolean
}

const initialState: ActivityState = {
    data: [],
    loading: false
};

// Sorting function type (payload of the action)
type SortFunction = (a: Activity, b: Activity) => number;


const ActivitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        sortActivitiesBy: (state, action: PayloadAction<SortFunction>) => {
            state.data = state.data.sort(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivities.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                // console.log('New Activity:', action.payload);
                state.data.push(action.payload);
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                state.data = state.data.filter(activity => activity.id != action.payload);
            })
            .addCase(updateActivity.fulfilled, (state, action) => {
                state.data = state.data.map(activity => {
                    if (action.payload.id === activity.id) {
                        return action.payload;
                    }
                    return activity;
                })
            })
    }
});

export const { sortActivitiesBy, setLoading } = ActivitySlice.actions;
export const activityReducer = ActivitySlice.reducer;
