import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"

const aapStore = configureStore({
    reducer : {
        user : userReducer,
    }
});

export default aapStore;