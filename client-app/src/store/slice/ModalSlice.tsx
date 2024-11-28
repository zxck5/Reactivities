import { createSlice } from "@reduxjs/toolkit";
import { registerUserAsyncThunk } from "./Api/AccountSliceAsyncThunk";

interface Modal {
    open: boolean;
    body: string | null;
}

const initialState: Modal = {
    open: false,
    body: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        openModal: (state, action) => {
            state.open = true;
            state.body = action.payload;
        },
        closeModal: (state) => {
            state.open = false;
            state.body = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAsyncThunk.fulfilled, (state) => {
                state.open = false;
                state.body = null;
            })
    }

});
export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;