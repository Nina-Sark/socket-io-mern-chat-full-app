import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth";

const login = createAsyncThunk("auth/login", async ({ email, password }, thunkApi) => {
    const userData = await AUTH_API.loginUserEndpoint({ email, password })
    return userData;
})

export default login;