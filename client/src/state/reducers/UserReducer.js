import { createSlice } from "@reduxjs/toolkit";
import { extractError, isError } from "../../utils/extractError";
import { getCurrentUser } from "../thunks/users/getCurrentUser";
import { searchUsers } from "../thunks/users/searchUsers";
import { updateProfilePic } from "../thunks/users/updateProfilePic";

const initialState = {
  userData: null,
  user_loading: true,
  pic_loading: false,
  pic_error: null,
  searched_participants: [],
  search_participants_loading: false,
  searched_users: [],
  search_users_loading: false,
};

const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser : (state = initialState, action) => {
       return {
         ...state,
         userData: null,
         pic_error: null,
         searched_participants: [],
         searched_users: [],
       }
    },
    clearError: (state = initialState, action) => {
      return {
        ...state,
        [action.payload]: null,
      };
    },
    clearSearchData: (state = initialState, { payload }) => {
      return {
        ...state,
        [`searched_${payload}`]: [],
      };
    },
    startLoading: (state = initialState, { payload }) => {
      return {
        ...state,
        [`search_${payload}_loading`]: true,
      };
    },
  },
  extraReducers: {
    [getCurrentUser.pending]: (state = initialState, action) => {
      return {
        ...state,
        user_loading: true,
      };
    },
    [getCurrentUser.fulfilled]: (state = initialState, action) => {
      console.log(action.payload);
      return {
        ...state,
        userData: action.payload,
        user_loading: false,
      };
    },
    [updateProfilePic.pending]: (state = initialState, action) => {
      return {
        ...state,
        pic_loading: true,
        pic_error: null,
      };
    },
    [updateProfilePic.fulfilled]: (state = initialState, action) => {
      return {
        ...state,
        [isError(action.payload) ? "pic_error" : "userData"]: isError(
          action.payload
        )
          ? extractError(action.payload)
          : {
              user: {
                ...state?.userData?.user,
                profilePic: action.payload?.profilePic,
              },
            },
        pic_loading: false,
      };
    },
    [searchUsers.fulfilled]: (state = initialState, action) => {
      console.log(action.payload);
      return {
        ...state,
        [`search_${action.payload?.category}_loading`]: false,
        [`searched_${action.payload?.category}`]: action.payload?.data?.users,
      };
    },
  },
});

export const {
  clearError,
  startLoading,
  clearSearchData,
  resetUser
} = UserReducer.actions;

export default UserReducer.reducer;
