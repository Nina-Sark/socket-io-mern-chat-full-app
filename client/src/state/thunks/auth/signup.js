import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth";

const signup = createAsyncThunk("auth/signup", async (data, thunkApi) => {
    const userData = await AUTH_API.signupUserEndpoint(data)
    return userData;
})

export default signup;