import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth";

const logout = createAsyncThunk("auth/logout", async (token, thunkAPI) => {
  const data = await AUTH_API.logoutUser(token);
  return data;
});

export default logout;
