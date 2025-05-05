import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addUserFeed: (state, action) => {
            return action.payload;
        },
        removeUserFeed: (state,action) => {
            const newArray = state.filter((feed)=>feed._id !== action.payload);
            return newArray;
        },
    },
});

export const { addUserFeed, removeUserFeed } = feedSlice.actions;
export default feedSlice.reducer;
