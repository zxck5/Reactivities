import { createAsyncThunk } from "@reduxjs/toolkit";
import { Activity } from "../../../app/models/activity";
import agent from "../../../app/api/agent";

const fetchActivities = createAsyncThunk<Activity[]>('activity/fetchActivities',
    async () => {
        const response = await agent.Activities.list();
        console.log("FETCH ACTIVITIES ASYNC THUNK")
        return response.map((activity: Activity) => ({
            ...activity,
            date: activity.date.split('T')[0]
        }));
    }
);

const createActivity = createAsyncThunk<Activity, Activity>('activity/createActivity',
    async (activity) => {
        await agent.Activities.create(activity);
        return activity;
    }
);

const deleteActivity = createAsyncThunk<string, string>('activity/deleteActivity',
    async (id) => {
        await agent.Activities.delete(id);
        return id;
    }
)

const updateActivity = createAsyncThunk<Activity, Activity>('activity/updateActivity',
    async (activity) => {
        await agent.Activities.update(activity);
        return activity;
    }
)




export { fetchActivities, createActivity, deleteActivity, updateActivity };

