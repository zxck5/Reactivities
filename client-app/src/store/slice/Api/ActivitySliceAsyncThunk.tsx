import { createAsyncThunk } from "@reduxjs/toolkit";
import { Activity } from "../../../app/models/activity";
import agent from "../../../app/api/agent";
import { store } from "../..";

const fetchActivities = createAsyncThunk<Activity[]>('activity/fetchActivities',
    async () => {
        const { token } = store.getState().common;
        // const token = localStorage.getItem('jwt') || null;
        console.log("FETCH ACTIVITIES ASYNC THUNK");
        const response = await agent.Activities.list({
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return await response;
    }
);

const getActivity = createAsyncThunk<Activity, string>('activity/fetchActivity',
    async (id) => {
        // const token = localStorage.getItem('jwt');
        // axiosInstance.defaults.headers.Authorization = `Bearer ${token}`
        return await agent.Activities.details(id);
    }
)

const createActivity = createAsyncThunk<Activity, Activity>('activity/createActivity',
    async (activity) => {
        // const token = localStorage.getItem('jwt');
        // axiosInstance.defaults.headers.Authorization = `Bearer ${token}`
        await agent.Activities.create({ ...activity, date: new Date(activity.date) });
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
        await agent.Activities.update({ ...activity, date: new Date(activity.date) });
        return activity;
    }
)




export { fetchActivities, getActivity, createActivity, deleteActivity, updateActivity };

