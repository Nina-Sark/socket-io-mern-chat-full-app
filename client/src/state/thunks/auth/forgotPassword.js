import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth";

const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, thunkAPI) => {
    const data = await AUTH_API.forgotPasswordEndpoint(email);
    return data;
})

export default forgotPassword;