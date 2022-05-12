import { createSlice } from "@reduxjs/toolkit";
import login from "../thunks/auth/login";
import signup from "../thunks/auth/signup";
import { isError, extractError } from "../../utils/extractError";
import getEmailVerificationToken from "../thunks/auth/getEmailVerificationToken";
import verifyEmail from "../thunks/auth/verifyEmail";
import forgotPassword from "../thunks/auth/forgotPassword";
import resetPassword from "../thunks/auth/resetPassword";
import logout from "../thunks/auth/logout";

const initialState = {
  auth: !localStorage.getItem("auth")
    ? null
    : JSON.parse(localStorage.getItem("auth")),
  login_loading: false,
  login_error: null,
  signup_loading: false,
  signup_error: null,
  email_verification_loading: false,
  email_verification_message: null,
  email_verification_success: false,
  verify_email_loading: false,
  verify_email_error: null,
  forgot_password_loading: false,
  forgot_password_error: null,
  forgot_password_message: null,
  reset_password_loading: false,
  reset_password_error: null,
  reset_password_message: null,
  logout_loading: false,
  logout_error: null,
};

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth : (state = initialState, action) => {
       return initialState;
    },
    clearError: (state = initialState, { payload }) => {
      return {
        ...state,
        [payload]: null,
      };
    },
  },
  extraReducers: {
    [login.pending]: (state = initialState, action) => {
      return {
        ...state,
        login_error: null,
        login_loading: true,
      };
    },
    [login.fulfilled]: (state = initialState, { payload }) => {
      if (!isError(payload))
        localStorage.setItem("auth", JSON.stringify(payload));
      return {
        ...state,
        login_loading: false,
        [isError(payload) ? "login_error" : "auth"]: isError(payload)
          ? extractError(payload)
          : payload,
      };
    },
    [signup.pending]: (state = initialState, action) => {
      return {
        ...state,
        signup_error: null,
        signup_loading: true,
      };
    },
    [signup.fulfilled]: (state = initialState, { payload }) => {
      if (!isError(payload))
        localStorage.setItem("auth", JSON.stringify(payload));
      return {
        ...state,
        signup_loading: false,
        [isError(payload) ? "signup_error" : "auth"]: isError(payload)
          ? extractError(payload)
          : payload,
      };
    },
    [getEmailVerificationToken.pending]: (state = initialState, action) => {
      return {
        ...state,
        email_verification_loading: true,
      };
    },
    [getEmailVerificationToken.fulfilled]: (state = initialState, action) => {
      console.log(action.payload);
      return {
        ...state,
        email_verification_loading: false,
        email_verification_message: action.payload.message,
      };
    },
    [verifyEmail.pending]: (state = initialState, action) => {
      return {
        ...state,
        verify_email_loading: true,
        verify_email_error: null,
      };
    },
    [verifyEmail.fulfilled]: (state = initialState, { payload }) => {
      return {
        ...state,
        verify_email_loading: false,
        [isError(payload)
          ? "verify_email_error"
          : "email_verification_success"]: isError(payload)
          ? extractError(payload)
          : true,
      };
    },
    [forgotPassword.pending]: (state = initialState, action) => {
      return {
        ...state,
        forgot_password_loading: true,
      };
    },
    [forgotPassword.fulfilled]: (state = initialState, { payload }) => {
      console.log(payload);
      return {
        ...state,
        forgot_password_loading: false,
        [isError(payload)
          ? "forgot_password_error"
          : "forgot_password_message"]: isError(payload)
          ? extractError(payload)
          : payload?.message,
      };
    },
    [resetPassword.pending]: (state = initialState, action) => {
      return {
        ...state,
        reset_password_loading: true,
      };
    },
    [resetPassword.fulfilled]: (state = initialState, { payload }) => {
      console.log(payload);
      return {
        ...state,
        reset_password_loading: false,
        [isError(payload)
          ? "reset_password_error"
          : "reset_password_message"]: isError(payload)
          ? extractError(payload)
          : "Password was successfully reset",
      };
    },
    [logout.pending]: (state = initialState, action) => {
      return {
        ...state,
        logout_loading: true,
        logout_error: null,
      };
    },
    [logout.fulfilled]: (state = initialState, action) => {
      localStorage.removeItem("auth")
      return {
        ...state,
        logout_loading: false,
        auth : null,
        logout_error: isError(action.payload)
          ? extractError(action.payload)
          : null,
      };
    },
  },
});

export const { clearError, resetAuth } = AuthReducer.actions;

export default AuthReducer.reducer;
