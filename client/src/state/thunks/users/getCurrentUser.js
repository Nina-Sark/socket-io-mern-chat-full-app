import { createAsyncThunk } from "@reduxjs/toolkit";
import USERS_API from "../../../api/user";

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (token, thunkApi) => {
    const data = await USERS_API.getCurrentUser(token);
    return data;
  }
);
