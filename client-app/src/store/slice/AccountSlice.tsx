import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { getCurrentUserAsyncThunk, loginUserAsyncThunk, registerUserAsyncThunk } from "./Api/AccountSliceAsyncThunk";


interface UserState {
    user?: User;
    // loading: boolean;
}

const initialState: UserState = {
    user: undefined,
    // loading: false
}

const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUserAsyncThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                // state.loading = false;
            })

            // .addCase(registerUserAsyncThunk.fulfilled, (state) => {
            //     state.loading = false;
            // })
            // .addCase(registerUserAsyncThunk.rejected, (state) => {
            //     state.loading = false;
            // })
            // .addCase(registerUserAsyncThunk.pending, (state) => {
            //     state.loading = true;
            // })


            .addCase(loginUserAsyncThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                // state.loading = false;
            })
        // .addCase(loginUserAsyncThunk.rejected, (state, action) => {
        //     console.error("Login failed:", action.error.message);
        //     state.formError = action.error.message || "Login failed.";
        // })

    }
});

export const { setUser, logout } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;