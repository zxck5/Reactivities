import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../../app/models/activity';
import { createActivity, fetchActivities, deleteActivity, updateActivity, getActivity } from './Api/ActivitySliceAsyncThunk';
import { format } from 'date-fns';


export interface ActivityState {
    data: Activity[],
    loading: boolean,
    groupedData: Array<[string, Activity[]]>,
    selectedActivity: Activity | undefined,

}

const initialState: ActivityState = {
    data: [],
    loading: false,
    groupedData: [],
    selectedActivity: undefined
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
        },
        setGroupedActivities: (state) => {
            state.groupedData = Object.entries(
                state.data.reduce((activities, activity) => {
                    // const date = activity.date!.toISOString().split('T')[0];
                    const date = format(activity.date!, 'dd MMM yyyy')
                    activities[date] = activities[date]
                        ? [...activities[date], activity]
                        : [activity];
                    return activities;
                }, {} as { [key: string]: Activity[] })
            )
        },
        setSelectedActivity: (state, action) => {
            console.log(action.payload)
            state.selectedActivity = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivities.fulfilled, (state, action) => {
                state.data = action.payload.map((activity: Activity) => ({
                    ...activity,
                    date: new Date(activity.date!).getTime()
                }));
            })
            .addCase(fetchActivities.rejected, (state, action) => {

            })
            .addCase(getActivity.fulfilled, (state, action) => {
                state.selectedActivity = action.payload;
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                // console.log('New Activity:', action.payload);
                console.log("It is fullfilled");
                state.data.push(action.payload);
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                state.data = state.data.filter(activity => activity.id != action.payload);
            })
            .addCase(updateActivity.fulfilled, (state, action) => {
                state.data = state.data.map(activity => {
                    console.log("UPDATE")
                    if (action.payload.id === activity.id) {
                        return action.payload;
                    }
                    return activity;
                })
            })
    }
});

export const { sortActivitiesBy, setLoading, setGroupedActivities, setSelectedActivity } = ActivitySlice.actions;
export const activityReducer = ActivitySlice.reducer;
