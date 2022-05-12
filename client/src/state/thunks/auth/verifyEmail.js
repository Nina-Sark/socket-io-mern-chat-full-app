import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth";

const verifyEmail = createAsyncThunk("auth/verifyEmail", async ({ emailToken, userToken }, thunkApi) => {
    const message = await AUTH_API.verifyEmailEndpoint(emailToken, userToken);
    return message;
})

export default verifyEmail;