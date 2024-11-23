import { createSlice } from "@reduxjs/toolkit";


interface ErrorState {
    message: string,
    details: string
}

const initialState: ErrorState = {
    message: '',
    details: ''
}

const ActivityErrorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            const { message, details } = action.payload;
            state.message = message;
            state.details = details;

        }
    }
});





export const ActivityErrorReducer = ActivityErrorSlice.reducer;
export const { setError } = ActivityErrorSlice.actions;