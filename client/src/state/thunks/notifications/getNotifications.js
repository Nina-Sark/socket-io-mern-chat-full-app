import { createAsyncThunk } from "@reduxjs/toolkit";
import NOTIFICATIONS_API from "../../../api/notifications";

export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async (token, thunkAPI) => {
    const data = await NOTIFICATIONS_API.getNotifications(token);
    return data;
  }
);
