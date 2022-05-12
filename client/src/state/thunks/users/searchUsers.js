import { createAsyncThunk } from "@reduxjs/toolkit";
import USERS_API from "../../../api/user";
import { startLoading } from "../../reducers/UserReducer";

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async ({ token, keyword, category }, { dispatch }) => {
    dispatch(startLoading(category))
    const data = await USERS_API.searchUsers(token, keyword);
    return { data, category };
  }
);
