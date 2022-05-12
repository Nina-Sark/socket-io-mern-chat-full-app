import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth";

const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, thunkAPI) => {
    const data = await AUTH_API.resetPasswordEndpoint(token, newPassword);
    return data;
  }
);

export default resetPassword;
