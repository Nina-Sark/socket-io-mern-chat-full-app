import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import ChatReducer from "./reducers/ChatReducer";
import Notifications from "./reducers/Notifications";
import UserReducer from "./reducers/UserReducer";

const reducers = combineReducers({
    auth : AuthReducer,
    user : UserReducer,
    chat : ChatReducer,
    notification : Notifications
})

const store = configureStore({
    reducer : reducers
})


export default store;