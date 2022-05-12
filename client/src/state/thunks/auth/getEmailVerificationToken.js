import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth";

const getEmailVerificationToken = createAsyncThunk("auth/getEmailVerificationToken", async (token, thunkApi) => {
    const message = await AUTH_API.getEmailVerificationTokenEndpoint(token)
    console.log(message)
    return message;
})

export default getEmailVerificationToken;