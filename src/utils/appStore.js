import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
import appReducer from "./appSlice"


const aapStore = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        connection : connectionReducer,
        request : requestReducer,
        app : appReducer,
    }
});

export default aapStore;