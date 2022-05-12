import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../thunks/notifications/getNotifications";

const initialState = {
  notifications: [],
  newNotifications: 0,
  loading: false,
};

const NotificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state = initialState, action) => {
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        newNotifications: state.newNotifications + 1,
      };
    },
    resetNotificationsNumber: (state = initialState, action) => {
      return {
        ...state,
        newNotifications: 0,
      };
    },
    removeNotification: (state = initialState, action) => {
      return {
        ...state,
        notifications: [...state.notifications].filter(
          (notification) => notification?.message_id !== action.payload
        ),
      };
    },
  },
  extraReducers: {
    [getNotifications.pending]: (state = initialState, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [getNotifications.fulfilled]: (state = initialState, action) => {
      console.log("nnnn", action.payload?.notifications)
      return {
        ...state,
        loading: false,
        notifications: action.payload?.notifications,
        newNotifications: action.payload?.notifications?.filter(
          (notification) => notification?.read === false
        )?.length,
      };
    },
  },
});

export const {
  addNotification,
  resetNotificationsNumber,
  removeNotification,
} = NotificationReducer.actions;

export default NotificationReducer.reducer;
