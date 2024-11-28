import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../../../app/api/agent";
import { User, UserFormValues } from "../../../app/models/user";
import { closeModal, store } from "../..";
import { AxiosError } from "axios";

const getCurrentUserAsyncThunk = createAsyncThunk<User>('account/current',
    async () => {
        console.log("GET USER ASYNC THUNK");
        const { token } = store.getState().common;
        // axiosInstance.defaults.headers.Authorization = `Bearer ${token}`
        const response = await agent.Account.current({
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    }
);

const registerUserAsyncThunk = createAsyncThunk<User, UserFormValues>('account/register',
    async (form, thunkAPI) => {
        console.log("REGISTER USER ASYNC THUNK");
        try {
            return await agent.Account.register(form);
        } catch (error) {
            const axiosError = error as AxiosError;
            // const { data, status, config } = error.response as AxiosResponse;
            console.error("Error in registerUserAsyncThunk:", axiosError);
            return thunkAPI.rejectWithValue(axiosError || 'Registration failed');
        }
        // return await agent.Account.register(form);

    }
)

const loginUserAsyncThunk = createAsyncThunk<User, UserFormValues>('account/login',
    async (form) => {
        console.log("LOGIN USER ASYNC THUNK");
        const user = await agent.Account.login(form);
        localStorage.setItem('jwt', user.token);
        store.dispatch(closeModal())
        return user
    }
);


export { getCurrentUserAsyncThunk, registerUserAsyncThunk, loginUserAsyncThunk };

