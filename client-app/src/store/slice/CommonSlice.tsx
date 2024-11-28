import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserAsyncThunk, loginUserAsyncThunk } from "./Api/AccountSliceAsyncThunk";
import { ServerError } from "../../app/models/serverError";

interface CommonState {
    error?: ServerError;
    token: string | null | undefined;
    appLoaded: boolean
}

const initialState: CommonState = {
    error: undefined,
    token: localStorage.getItem('jwt') || null,
    appLoaded: false
}

const CommonSlice = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        setServerError: (state, action) => {
            state.error = action.payload;
        },
        setAppLoaded: (state) => {
            state.appLoaded = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsyncThunk.fulfilled, (state, action) => {
                const token = action.payload.token;
                state.token = token;

            })
            .addCase(getCurrentUserAsyncThunk.fulfilled, (state) => {
                state.appLoaded = false;
            })
            .addCase(getCurrentUserAsyncThunk.pending, (state) => {
                state.appLoaded = true;
            })
            .addCase(getCurrentUserAsyncThunk.rejected, (state) => {
                state.appLoaded = false;
            })

            .addCase('account/logout', (state) => {
                console.log('CommonSlice --> extra reducer --> user/logout')
                state.token = null;
                localStorage.removeItem('jwt');
            })
    }

});

export const commonReducer = CommonSlice.reducer;
export const { setServerError, setAppLoaded } = CommonSlice.actions;