import { createAsyncThunk } from "@reduxjs/toolkit";
import USERS_API from "../../../api/user";

export const updateProfilePic = createAsyncThunk(
  "users/updateProfilePic",
  async ({ token, picture }, thunkApi) => {
    const data = await USERS_API.updateProfilePic(token, picture);
    console.log(data)
    return data;
  }
);
