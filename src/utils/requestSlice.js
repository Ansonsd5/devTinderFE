import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state,action) =>{
      const newArray = state.filter((item) =>item._id !== action.payload);
      return newArray;
    } ,
    emptyAllrequest :() =>null
  },
});

export const { addRequest, removeRequest, emptyAllrequest } = requestSlice.actions;
export default requestSlice.reducer;
